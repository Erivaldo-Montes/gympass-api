import { beforeEach } from 'node:test'
import { describe } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate'

describe('create gym', () => {
  beforeEach(() => {})

  it('Should be able to create a gym', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const response = await request(app)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({})
  })
})
