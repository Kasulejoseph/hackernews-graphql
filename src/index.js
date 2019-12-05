
import {
    GraphQLServer
} from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
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
        feeds: (root, args, context, info) => {
            return context.prisma.links()
        },
        link: (parent, args) => {
            const link = links.find(({
                id
            }) => id === args.id)
            return link

        }
    },
    Mutation: {
        post: (parent, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            })
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
        },
        deleteLink: (parent, args) => {
            const index = links.findIndex(({
                id
            }) => id === args.id)
            return links.splice(index, 1)[0]
        }

    }
}



const server = new GraphQLServer({
    typeDefs: typeDefs(),
    resolvers,
    context: { prisma }
})

server.start(() => console.log(`Server Running`))