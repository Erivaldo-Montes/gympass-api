import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function nearbyGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymsQuerySchema = z.object({
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const nearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ gyms })
}
