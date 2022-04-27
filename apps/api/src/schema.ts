import { asNexusMethod, makeSchema, objectType } from 'nexus'
import path from 'path'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.string('title')
    t.string('content')
    t.nonNull.boolean('published')
    t.nullable.int('viewCount')
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.post
          .findUnique({
            where: { id: parent?.id },
          })
          .author()
      },
    })
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent?.id },
          })
          .posts()
      },
    })
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.field('allUsers', {
      type: 'User',
      resolve: (_p, _a, c: Context) => {
        return c.prisma.user.findMany()
      },
    })
  },
})

const schema = makeSchema({
  types: [Query, DateTime, User, Post],
  outputs: {
    schema: path.join(__dirname, '../generated/schema.graphql'),
    typegen: path.join(__dirname, '../generated/nexus.ts'),
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export default schema
