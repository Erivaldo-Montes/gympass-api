import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function checkInsHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInsHistoryQueryschema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInsHistoryQueryschema.parse(request.query)

  const fetchCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkIns })
}
