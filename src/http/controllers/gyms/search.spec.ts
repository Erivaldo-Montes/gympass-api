import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate'

describe('Search gym', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Jhon Doe Academy',
        description: 'some decription',
        phone: '12345',
        latitude: 7.7517794,
        longitude: -35.6053779,
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Bob Academy',
        description: 'some decription',
        phone: '123458',
        latitude: 7.751779,
        longitude: -35.6053779,
      })

    const response = await request(app.server)
      .get('/gym/search')
      .set('Authorization', `Bearer ${token}`)
      .query({ q: 'Bob' })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Bob Academy' }),
    ])
  })
})
