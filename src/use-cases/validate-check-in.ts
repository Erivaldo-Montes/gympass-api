import { CheckInRepository } from '@/repositories/check-in-repository'
import { checkIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-exists-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckInCaseRequest {
  checkInId: string
}

interface ValidateCheckInCaseResponse {
  checkIn: checkIn
}

export class ValidateCheckInCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInCaseRequest): Promise<ValidateCheckInCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinuteFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinuteFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
