import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate'

describe('Profile e2e', () => {
  beforeAll(async () => {
    // espera o servidor subir
    await app.ready()
  })

  afterAll(async () => {
    // espera o servidor encerrar-se
    await app.close()
  })

  it('Should be able to get user profile', async () => {
    // faz requisição http sem preciser iniciar o servidor

    const { token } = await CreateAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jhonDoe@email.com',
      }),
    )
  })
})
