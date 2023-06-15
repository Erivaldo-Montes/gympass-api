import { Prisma, checkIn } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn>
}
