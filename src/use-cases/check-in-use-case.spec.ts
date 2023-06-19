import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/binary'
import { MaxCheckInPerDay } from './errors/max-check-in-per-day-error'
import { MaxDistanceError } from './errors/max-distance-error'

let SUT: CheckInUseCase
let checkInRepositoryInMemory: InMemoryCheckInsRepository
let inMemoryGymRepository: InMemoryGymRepository
describe('check in ', () => {
  beforeEach(async () => {
    checkInRepositoryInMemory = new InMemoryCheckInsRepository()
    inMemoryGymRepository = new InMemoryGymRepository()
    SUT = new CheckInUseCase(checkInRepositoryInMemory, inMemoryGymRepository)

    // faz com o que os new Dates sejam de uma data especifica
    vi.useFakeTimers()

    await inMemoryGymRepository.create({
      id: 'gyn-id-01',
      title: 'BombaRide',
      description: '',
      phone: '',
      latitude: new Decimal(7.7940028),
      longitude: new Decimal(-35.5991874),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await SUT.execute({
      gymId: 'gyn-id-01',
      userId: 'user-id-01',
      userLatitude: 7.7940028,
      userLongitude: -35.5991874,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 9, 4, 14, 0, 0))
    await SUT.execute({
      gymId: 'gyn-id-01',
      userId: 'user-id-01',
      userLatitude: 7.7940028,
      userLongitude: -35.5991874,
    })

    await expect(() =>
      SUT.execute({
        gymId: 'gyn-id-01',
        userId: 'user-id-01',
        userLatitude: 7.7940028,
        userLongitude: -35.5991874,
      }),
    ).rejects.toBeInstanceOf(MaxCheckInPerDay)
  })

  it('Should  be able to check in different day', async () => {
    vi.setSystemTime(new Date(2023, 9, 4, 14, 0, 0))
    await SUT.execute({
      gymId: 'gyn-id-01',
      userId: 'user-id-01',
      userLatitude: 7.7940028,
      userLongitude: -35.5991874,
    })

    vi.setSystemTime(new Date(2023, 9, 5, 14, 0, 0))
    const { checkIn } = await SUT.execute({
      gymId: 'gyn-id-01',
      userId: 'user-id-01',
      userLatitude: 7.7940028,
      userLongitude: -35.5991874,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in on distant gym', async () => {
    await inMemoryGymRepository.gyms.push({
      id: 'gyn-id-02',
      title: 'BombaRide',
      description: '',
      phone: '',
      latitude: new Decimal(7.7940028),
      longitude: new Decimal(-35.5991874),
    })
    // 7.7940028,-35.5991874

    await expect(() =>
      SUT.execute({
        gymId: 'gyn-id-02',
        userId: 'user-id-01',
        userLatitude: 7.7517794,
        userLongitude: -35.6053779,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
