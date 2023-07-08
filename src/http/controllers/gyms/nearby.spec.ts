import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate'

describe('nearby gym (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able fetch nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    console.log('response')

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'near gym',
        description: null,
        phone: null,
        // -7.745215837854092, -35.60253327603451
        latitude: -7.745215837854092,
        longitude: -35.60253327603451,
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'far gym',
        description: null,
        phone: null,
        // -7.683844046098058, -35.510403521827186
        latitude: -7.683844046098058,
        longitude: -35.510403521827186,
      })

    const response = await request(app.server)
      .get('/gym/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({ latitude: -7.745215837854092, longitude: -35.60253327603451 })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'near gym' }),
    ])
  })
})
