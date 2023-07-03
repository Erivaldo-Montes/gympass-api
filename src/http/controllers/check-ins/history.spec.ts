import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate'
import { prisma } from '@/lib/prisma'
import request from 'supertest'

describe('History (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to get check-in history', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: "Jhon's Academy",
        description: 'some description',
        phone: '12345678',
        latitude: 7.7517794,
        longitude: -35.6053779,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-in/history')
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 1,
      })

    expect(response.status).toEqual(200)
    expect(response.body.checkIns).toHaveLength(2)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
      expect.objectContaining({ gym_id: gym.id, user_id: user.id }),
    ])
  })
})
