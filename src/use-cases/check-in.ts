import { CheckInRepository } from '@/repositories/check-in-repository'
import { GymRepository } from '@/repositories/gym-repository'
import { checkIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-exists-error'
import { getDistanceBetweenCoodintes } from '@/utils/get-distance-between-coordenate'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxCheckInPerDay } from './errors/max-check-in-per-day-error'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLongitude: number
  userLatitude: number
}

interface CheckInUseCaseResponse {
  checkIn: checkIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const dist = getDistanceBetweenCoodintes(
      { longitude: userLongitude, latitude: userLatitude },
      {
        longitude: gym.longitude.toNumber(),
        latitude: gym.latitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (dist > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInSameDay) {
      throw new MaxCheckInPerDay()
    }
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
