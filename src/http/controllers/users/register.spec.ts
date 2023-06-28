import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register e2e', () => {
  beforeAll(async () => {
    // espera o servidor subir
    await app.ready()
  })

  afterAll(async () => {
    // espera o servidor encerrar-se
    await app.close()
  })

  it('Should be able to register', async () => {
    // faz requisição http sem preciser iniciar o servidor
    const response = await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhonDoe@email.com',
      password: 'password',
    })

    expect(response.statusCode).toEqual(201)
  })
})
