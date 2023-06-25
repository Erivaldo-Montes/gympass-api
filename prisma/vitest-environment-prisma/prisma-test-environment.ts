import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'

import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const prisma = new PrismaClient()
function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please, provide a database url environment variables')
  }

  const databaseURL = new URL(process.env.DATABASE_URL)

  databaseURL.searchParams.set('schema', schema)

  return databaseURL.toString()
}
export default <Environment>{
  name: 'prisma',
  async setup() {
    // cria um banco de dados temporário para testes e2e
    const databaseSchema = randomUUID()

    const databaseURL = generateDatabaseURL(databaseSchema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')
    return {
      async teardown() {
        // apaga o banco de dados criado anteriormente
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${databaseSchema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
