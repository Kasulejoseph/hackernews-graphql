
export const typeDefs = () => `
    type Query {
        info: String!
        feeds: [Link!]!
        link(id: ID!): Link
    }
    
    type Mutation {
        post(url: String!, description: String!): Link!
        updateLink(id: ID!, url: String, description: String): Link
        deleteLink(id: ID!): Link
    }
    type Link {
        id: ID!
        description: String!
        url: String!
    }
`