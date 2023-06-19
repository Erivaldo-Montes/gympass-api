import { Prisma, checkIn } from '@prisma/client'

export class CheckInRepository {
  async create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn> {}
}
