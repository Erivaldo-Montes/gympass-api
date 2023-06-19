import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let SUT: SearchGymsUseCase
let gymsRepository: InMemoryGymRepository

describe('Search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    SUT = new SearchGymsUseCase(gymsRepository)
  })
  it('Should be able to search a gym by title', async () => {
    await gymsRepository.create({
      title: 'Jhon gym',
      description: null,
      phone: null,
      latitude: 7.7517794,
      longitude: -35.6053779,
    })

    await gymsRepository.create({
      title: 'Doe gym',
      description: null,
      phone: null,
      latitude: 7.7517794,
      longitude: -35.6053779,
    })

    const { gyms } = await SUT.execute({
      page: 1,
      query: 'Doe',
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: `Doe gym` })])
  })

  it('Should be able to fetch paginated gyms ', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Jhon gym ${i}`,
        description: null,
        phone: null,
        latitude: 7.7517794,
        longitude: -35.6053779,
      })
    }

    const { gyms } = await SUT.execute({
      page: 2,
      query: 'Jhon',
    })

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Jhon gym 21' }),
      expect.objectContaining({ title: 'Jhon gym 22' }),
    ])
  })
})
