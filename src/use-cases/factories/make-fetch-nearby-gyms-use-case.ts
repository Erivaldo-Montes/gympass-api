import { FetchNearbyGymUseCase } from '../fetch-nearby-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymUseCase(gymsRepository)

  return useCase
}
