import { makeGetUserUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfileUseCase = makeGetUserUserProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ user: { ...user, password_hash: undefined } })
}
