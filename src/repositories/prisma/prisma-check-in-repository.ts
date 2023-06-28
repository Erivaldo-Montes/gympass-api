import { Prisma, checkIn } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements CheckInRepository {
  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<checkIn | null> {
    const startOfTheday = dayjs(date).startOf('date')
    const endOfTheday = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheday.toDate(),
          lte: endOfTheday.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number): Promise<checkIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async countByUserId(userId: string): Promise<number> {
    const countCheckIn = await prisma.checkIn.count({
      where: { user_id: userId },
    })

    return countCheckIn
  }

  async findById(id: string): Promise<checkIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async save(data: checkIn): Promise<checkIn> {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }

  async create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }
}
