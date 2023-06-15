import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential-error'
import { makeAuthtenticateUseCase } from '@/use-cases/factories/make-autheticate-use-case'

export async function autheticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthtenticateUseCase()
    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
