import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile-use-case'

export function makeGetUserUserProfileUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(userRepository)

  return useCase
}
