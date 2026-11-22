import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  const client = new PrismaClient()
  client.$use(async (params, next) => {
    if (params.model === 'WorkspaceAudit' && ['update', 'updateMany', 'upsert', 'delete', 'deleteMany'].includes(params.action)) {
      throw new Error('Workspace audit records are append-only.')
    }
    return next(params)
  })
  return client
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
