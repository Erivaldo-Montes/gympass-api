import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let SUT: FetchUserCheckInsHistoryUseCase
let checkInRepositoryInMemory: InMemoryCheckInsRepository

describe('fetch user check in history use case', () => {
  beforeEach(async () => {
    checkInRepositoryInMemory = new InMemoryCheckInsRepository()

    SUT = new FetchUserCheckInsHistoryUseCase(checkInRepositoryInMemory)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able get user check-ins history', async () => {
    await checkInRepositoryInMemory.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    })

    await checkInRepositoryInMemory.create({
      gym_id: 'gym-id-02',
      user_id: 'user-id-01',
    })

    const { checkIns } = await SUT.execute({
      userId: 'user-id-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-01' }),
      expect.objectContaining({ gym_id: 'gym-id-02' }),
    ])
  })

  it('Should be able fetch paginated user check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepositoryInMemory.create({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id-01',
      })
    }

    const { checkIns } = await SUT.execute({
      userId: 'user-id-01',
      page: 2,
    })

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-21' }),
      expect.objectContaining({ gym_id: 'gym-id-22' }),
    ])
  })
})
