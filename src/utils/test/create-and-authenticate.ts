import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface response {
  token: {
    token: string
  }
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
): Promise<response> {
  await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhonDoe@email.com',
      password_hash: await hash('password', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })
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
