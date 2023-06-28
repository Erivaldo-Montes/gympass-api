import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Autheticate e2e', () => {
  beforeAll(async () => {
    // espera o servidor subir
    await app.ready()
  })

  afterAll(async () => {
    // espera o servidor encerrar-se
    await app.close()
  })

  it('Should be able to autheticate', async () => {
    // faz requisição http sem preciser iniciar o servidor

    await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhonDoe@email.com',
      password: 'password',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'jhonDoe@email.com',
      password: 'password',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
