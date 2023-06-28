import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
