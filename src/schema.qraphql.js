
export const typeDefs = () => `
    type Query {
        info: String!
        feeds: [Link!]!
    }
    
    type Mutation {
        post(url: String!, description: String!): Link!
    }
    type Link {
        id: ID!
        description: String!
        url: String!
    }
`