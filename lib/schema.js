import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Article {
    id: ID!
    title: String!
    content: String!
    published_date: String!
    # 其他字段...
  }

  type Query {
    articles: [Article]!
  }
`
