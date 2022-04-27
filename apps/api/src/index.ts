import { ApolloServer } from 'apollo-server'
import schema from './schema'
import context from './context'
import { example } from '@todos/prisma'

export default async function main() {
  const server = new ApolloServer({
    schema,
    context,
  })
  server
    .listen()
    .then(({ url }) => console.log(`OK : Listening at ${url} ${example}`))
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await context.prisma.$disconnect()
  })
