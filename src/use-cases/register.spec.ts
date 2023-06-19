import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'

import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository-in-memory'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryRepository: InMemoryUsersRepository
let SUT: RegisterUseCase
describe('Register use case', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    SUT = new RegisterUseCase(inMemoryRepository)
  })

  it('Should be able to register a user', async () => {
    const { user } = await SUT.execute({
      name: 'jhon Doe',
      email: 'jhonDoe@email.com',
      password: 'JhonDoe123',
    })

    // expera que o user tenha qualquer string no id
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await SUT.execute({
      name: 'joão doe',
      email: 'joaodoe@email.com',
      password: 'manga2231',
    })

    const isPasswordCorrectlyHashed = await compare(
      'manga2231',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to regiter with same email twice', async () => {
    const email = 'erivaldo@email.com'

    await SUT.execute({
      name: 'erivaldo',
      email,
      password: '12recicly41',
    })

    // valida se a Promise será rejeitada com um erro de classe
    await expect(() =>
      SUT.execute({
        name: 'erivaldo',
        email,
        password: '12recicly41',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
