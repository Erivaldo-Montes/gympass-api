import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createCheckInController } from './create'
import { validateCheckInController } from './validate'
import { getUserMetricsController } from './getMetrics'
import { checkInsHistoryController } from './history'

export async function checkIns(app: FastifyInstance) {
  await app.addHook('onRequest', verifyJWT)

  app.get('/check-in/metrics', getUserMetricsController)
  app.get('/check-in/history', checkInsHistoryController)

  app.post('/gym/:gymId/check-in', createCheckInController)
  app.patch('/check-in/:checkInId/validate', validateCheckInController)
}
