import fastify from 'fastify'
import { usersRoutes } from '@/http/controllers/users/routes'
import { gymsRoutes } from '@/http/controllers/gyms/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { checkIns } from './http/controllers/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET })
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkIns)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issue: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: dataDog/NewRelic/sentry
  }
  return reply.status(500).send({ message: 'internal server Error' })
})
