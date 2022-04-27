import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
dotenv.config()

const prisma = new PrismaClient({})

export type { PrismaClient }

export const example = 'change'

export default prisma
