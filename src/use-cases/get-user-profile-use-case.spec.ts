import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile-use-case'

import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository-in-memory'
import { ResourceNotFoundError } from './errors/resource-not-exists-error'

let SUT: GetUserProfileUseCase
let userRepository: InMemoryUsersRepository

describe('Get user profile', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    SUT = new GetUserProfileUseCase(userRepository)
  })
  it('Should be able get user profile', async () => {
    const user = await userRepository.create({
      name: 'Jhon Doe',
      email: 'JhonDoe@email.com',
      password_hash: 'correctPass',
    })

    const { user: userProfile } = await SUT.execute({ userId: user.id })

    expect(userProfile.id).toEqual(user.id)
  })

  it('Should not be able get user Profile with non exists id', async () => {
    await userRepository.create({
      name: 'Jhon Doe',
      email: 'JhonDoe@email.com',
      password_hash: 'correctPass',
    })

    await expect(() =>
      SUT.execute({ userId: 'wrong-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
