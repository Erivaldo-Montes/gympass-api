import { describe, beforeEach, it, expect, vi, afterEach } from 'vitest'
import { ValidateCheckInCase } from './validate-check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-exists-error'
import { isError } from 'util'

let SUT: ValidateCheckInCase
let checkInRepository: InMemoryCheckInsRepository

describe('Validate check-in use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    SUT = new ValidateCheckInCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('Should be able to validate user check-in', async () => {
    const createdcheckIn = await checkInRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    })

    const { checkIn } = await SUT.execute({ checkInId: createdcheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('Should not be able to validate no existent check-in', async () => {
    await expect(() =>
      SUT.execute({ checkInId: 'no-existent-check-in-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should no be able to validate check-in after 20 minutes of its creations', async () => {
    vi.setSystemTime(new Date(2023, 5, 2, 13, 54))
    const createdcheckIn = await checkInRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      SUT.execute({ checkInId: createdcheckIn.id }),
    ).rejects.toBeInstanceOf(Error)
  })
})
