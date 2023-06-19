import { GymRepository } from '@/repositories/gym-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymUseCaseRequest): Promise<FetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLatitude,
    })

    return { gyms }
  }
}
