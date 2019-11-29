import {
    GraphQLServer
} from 'graphql-yoga'
import {
    typeDefs
} from './schema.qraphql'

let links = [{
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL ',
    url: 'www.howtographql.com'
}]

let feedCount = links.length
// defines graphQL schema
const resolvers = {
    Query: {
        info: () => 'Thats true',
        feeds: () => links,
        link: (parent, args) => {
            const link = links.find(({
                id
            }) => id === args.id)
            return link

        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${feedCount++}`,
                url: args.url,
                description: args.description
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            const index = links.findIndex(({
                id
            }) => id === args.id)
            const newLink = {
                url: args.url === undefined ? links[index].url : args.url,
                description: args.description === undefined ? links[index].description : args.description
            }
            links[index] = {
                ...links[index],
                ...newLink
            }
            return links[index]

        }

    }
}

const server = new GraphQLServer({
    typeDefs: typeDefs(),
    resolvers
})

server.start(() => console.log(`Server Running`))