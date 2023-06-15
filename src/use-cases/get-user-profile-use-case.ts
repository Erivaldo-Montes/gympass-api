import { UsersRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-exists-error'

interface AuthenticateUseCaseRequest {
  userId: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
