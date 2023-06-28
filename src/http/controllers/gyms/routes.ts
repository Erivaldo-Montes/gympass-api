import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { searchGymsController } from './search'
import { nearbyGymsController } from './nearby'
import { createGymController } from './create'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gym/search', searchGymsController)
  app.get('/gym/nearby', nearbyGymsController)

  app.post('/gym', createGymController)
}
