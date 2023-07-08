import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { searchGymsController } from './search'
import { nearbyGymsController } from './nearby'
import { createGymController } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gym/search', searchGymsController)
  app.get('/gym/nearby', nearbyGymsController)

  app.post(
    '/gym',
    { onRequest: [verifyUserRole('ADMIN')] },
    createGymController,
  )
}
