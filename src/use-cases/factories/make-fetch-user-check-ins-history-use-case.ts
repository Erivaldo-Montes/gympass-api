import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
