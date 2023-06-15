import { UsersRepository } from '@/repositories/user-repository'
import { InvalidCredentialError } from './errors/invalid-credential-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (doesPasswordMatches === false) {
      throw new InvalidCredentialError()
    }

    return { user }
  }
}
