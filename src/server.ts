import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
    // o host facilita a conecção por um front end
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('+++++ server is running +++++++++++')
  })
