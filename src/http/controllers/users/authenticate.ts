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
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    // refresh token
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
