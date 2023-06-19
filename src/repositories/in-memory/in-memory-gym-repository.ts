import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymRepository } from '../gym-repository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoodintes } from '@/utils/get-distance-between-coordenate'

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = []
  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      phone: data.phone ?? null,
    }

    this.gyms.push(gym)

    return gym
  }

  async seachMany(query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter((items) => items.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = this.gyms.filter((items) => {
      const distance = getDistanceBetweenCoodintes(
        { latitude, longitude },
        {
          latitude: items.latitude.toNumber(),
          longitude: items.longitude.toNumber(),
        },
      )
      console.log('distance', distance)
      return distance < 10
    })

    return gyms
  }
}
