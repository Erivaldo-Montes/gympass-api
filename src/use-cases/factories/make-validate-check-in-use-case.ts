import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { ValidateCheckInCase } from '../validate-check-in'

export function makeValidatecheckInUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new ValidateCheckInCase(checkInsRepository)

  return useCase
}
