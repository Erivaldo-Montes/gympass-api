import { afterAll, beforeAll, describe, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate'
import { prisma } from '@/lib/prisma'
import request from 'supertest'

describe('Create check-in (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: "Jhon's Academy",
        description: 'some description',
        phone: '12345678',
        latitude: 7.7517794,
        longitude: -35.6053779,
      },
    })

    const response = await request(app)
      .post(`/gym/${gym.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 7.7517794,
        longitude: -35.6053779,
      })
  })
})
