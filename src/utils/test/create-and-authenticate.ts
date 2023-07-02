import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface response {
  token: {
    token: string
  }
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
): Promise<response> {
  await request(app.server).post('/users').send({
    name: 'Jhon Doe',
    email: 'jhonDoe@email.com',
    password: 'password',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jhonDoe@email.com',
    password: 'password',
  })

  const { token } = authResponse.body

  return { token }
}
