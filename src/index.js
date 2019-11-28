import { GraphQLServer } from 'graphql-yoga'
import { typeDefs } from './schema.qraphql'

let link = [{
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL ',
    url: 'www.howtographql.com'
}]

// defines graphQL schema
const resolvers = {
    Query: {
        info: () => 'Thats true',
        feeds: () => link
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url

    }
}

const server = new GraphQLServer({
    typeDefs: typeDefs(),
    resolvers
})

server.start(() => console.log(`Server Running`))