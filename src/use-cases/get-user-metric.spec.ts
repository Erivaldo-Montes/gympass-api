import { describe, it, beforeEach, expect } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let SUT: GetUserMetricsUseCase
let checkInsRepository: InMemoryCheckInsRepository

describe('Get user metrics ', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    SUT = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('Should be able to get  check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-id-01',
      user_id: 'user-id-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-id-02',
      user_id: 'user-id-01',
    })

    const { checkInsCount } = await SUT.execute({ userId: 'user-id-01' })

    expect(checkInsCount).equal(2)
  })
})
