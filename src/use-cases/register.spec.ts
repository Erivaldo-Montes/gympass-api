import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'

import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository-in-memory'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register use case', () => {
  it('Should be able to register a user', async () => {
    const inMemoryRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryRepository)

    const { user } = await registerUseCase.execute({
      name: 'jhon Doe',
      email: 'jhonDoe@email.com',
      password: 'JhonDoe123',
    })

    // expera que o user tenha qualquer string no id
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'joão doe',
      email: 'joaodoe@email.com',
      password: 'manga2231',
    })

    console.log(user.password_hash)

    const isPasswordCorrectlyHashed = await compare(
      'manga2231',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to regiter with same email twice', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository)

    const email = 'erivaldo@email.com'

    await registerUseCase.execute({
      name: 'erivaldo',
      email,
      password: '12recicly41',
    })

    // valida se a Promise será rejeitada com um erro de classe
    await expect(() =>
      registerUseCase.execute({
        name: 'erivaldo',
        email,
        password: '12recicly41',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
