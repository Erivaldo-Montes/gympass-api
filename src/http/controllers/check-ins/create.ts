import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-exists-error'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCheckInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  try {
    const createCheckInUseCase = makeCheckInUseCase()

    await createCheckInUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
      gymId,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
