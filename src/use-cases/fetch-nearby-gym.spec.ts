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
      // -7.745215837854092, -35.60253327603451
      latitude: -7.745215837854092,
      longitude: -35.60253327603451,
    })

    await gymsRepository.create({
      title: 'far gym',
      description: null,
      phone: null,
      // -7.683844046098058, -35.510403521827186
      latitude: -7.683844046098058,
      longitude: -35.510403521827186,
    })

    const { gyms } = await SUT.execute({
      userLatitude: -7.748894133704862,
      userLongitude: -35.60109561214611,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'near gym' })])
  })
})
