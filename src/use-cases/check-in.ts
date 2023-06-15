import { CheckInRepository } from '@/repositories/check-in-repository'
import { checkIn } from '@prisma/client'

interface CheckInUseCaseRequest {
  userId: string
  gynId: string
}

interface CheckInUseCaseResponse {
  checkIn: checkIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    gynId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      gym_id: gynId,
      user_id: userId,
    })

    return { checkIn }
  }
}
