import { Prisma, checkIn } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<checkIn | null>
  findManyByUserId(userId: string, page: number): Promise<checkIn[]>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<checkIn | null>
  save(checkIn: checkIn): Promise<checkIn>
}
