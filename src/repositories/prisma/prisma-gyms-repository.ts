import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymRepository } from '../gym-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async seachMany(query: string, page: number): Promise<Gym[]> {
    const gym = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },

      take: 20,
      skip: (page - 1) * 20,
    })

    return gym
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM gyms
    WHERE (6371 * acos( cos( radians(${latitude})) * cos( radians(latitude)) * cos( radians(longitude)- radians(${longitude}))* sin( radians(latitude)))) <= 10
    `

    return gyms
  }
}
