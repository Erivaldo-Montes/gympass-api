import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymUseCase } from './fetch-nearby-gym'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let SUT: FetchNearbyGymUseCase
let gymsRepository: InMemoryGymRepository

describe('Fetch nearby gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    SUT = new FetchNearbyGymUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'near gym',
      description: null,
      phone: null,
      // -7.7478629,-35.6075115
      latitude: -7.7478629,
      longitude: -35.6075115,
    })

    await gymsRepository.create({
      title: 'far gym',
      description: null,
      phone: null,
      // -8.043133,-35.0166183
      latitude: -8.0431339,
      longitude: -35.0166183,
    })

    const { gyms } = await SUT.execute({
      userLatitude: -7.7478629,
      userLongitude: -35.6075115,
    })
    console.log(gyms)

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'far gym' })])
  })
})
