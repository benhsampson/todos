import prisma, { PrismaClient } from '@todos/prisma'

export type Context = { prisma: PrismaClient }

const context: Context = { prisma }

export default context
