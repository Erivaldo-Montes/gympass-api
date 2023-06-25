import { Prisma, checkIn } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public checkIns: checkIn[] = []

  async create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn> {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<checkIn | null> {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkIn = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const onSameDay =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

      return checkIn.user_id === userId && onSameDay
    })

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findManyByUserId(userId: string, page: number): Promise<checkIn[]> {
    const userCheckIns = this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return userCheckIns
  }

  async countByUserId(userId: string): Promise<number> {
    return this.checkIns.filter((items) => items.user_id === userId).length
  }

  async findById(id: string): Promise<checkIn | null> {
    const checkIn = this.checkIns.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async save(checkIn: checkIn): Promise<checkIn> {
    const checkInIndex = this.checkIns.findIndex(
      (item) => item.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }
}
