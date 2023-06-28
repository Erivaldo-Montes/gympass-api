import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let GymsRepository: InMemoryGymRepository
let SUT: CreateGymUseCase
describe('Create gym use case', () => {
  beforeEach(() => {
    GymsRepository = new InMemoryGymRepository()
    SUT = new CreateGymUseCase(GymsRepository)
  })

  it('Should be able to create gym', async () => {
    const { gym } = await SUT.execute({
      title: "Jhon's Academy",
      description: null,
      phone: null,
      latitude: 7.7517794,
      longitude: -35.6053779,
    })

    // expera que o user tenha qualquer string no id
    expect(gym.id).toEqual(expect.any(String))
  })
})
