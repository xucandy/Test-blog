import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from '../../../lib/schema'
import { resolvers } from '../../../lib/resolvers'

// 实例化ApolloServer
const apolloServer = new ApolloServer({ typeDefs, resolvers })
await apolloServer.start()
export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/articles/graphql' })
