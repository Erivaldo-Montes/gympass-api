import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository-in-memory'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credential-error'

let inMemoryRepository: InMemoryUsersRepository
let SUT: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    SUT = new AuthenticateUseCase(inMemoryRepository)
  })
  it('Should be able to authenticate', async () => {
    inMemoryRepository.create({
      name: 'jhon Doe',
      email: 'jhonDoe@email.com',
      password_hash: await hash('12345678', 6),
    })

    const { user } = await SUT.execute({
      email: 'jhonDoe@email.com',
      password: '12345678',
    })

    // expera que o user tenha qualquer string no id
    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    inMemoryRepository.create({
      name: 'jhon Doe',
      email: 'jhonDoe@email.com',
      password_hash: await hash('12345678', 6),
    })

    await expect(() =>
      SUT.execute({
        email: 'wrong@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    inMemoryRepository.create({
      name: 'jhon Doe',
      email: 'jhonDoe@email.com',
      password_hash: await hash('12345678', 6),
    })

    await expect(() =>
      SUT.execute({
        email: 'jhonDoe@email.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
