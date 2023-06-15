import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let SUT: CheckInUseCase
let checkInRepositoryInMemory: InMemoryCheckInsRepository

describe('check in ', () => {
  beforeEach(() => {
    checkInRepositoryInMemory = new InMemoryCheckInsRepository()
    SUT = new CheckInUseCase(checkInRepositoryInMemory)
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await SUT.execute({
      gynId: 'gyn-id-01',
      userId: 'user-id-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
