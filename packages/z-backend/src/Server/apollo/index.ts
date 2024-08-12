import { FastifyInstance } from 'fastify';
import { ApolloServer, BaseContext } from '@apollo/server'
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";

import typeDefs from './graphql/types'
import resolvers from './graphql/resolvers'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

export const apolloBuilder = (fastify: FastifyInstance) => new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      fastifyApolloDrainPlugin(fastify),
      ApolloServerPluginDrainHttpServer({ httpServer: fastify.server }),
    ],
});