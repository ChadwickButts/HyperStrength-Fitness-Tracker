// https://www.npmjs.com/package/@as-integrations/next

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server';
import postgres from 'postgres';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

const server = new ApolloServer({
    resolvers,
    typeDefs
});

// https://www.apollographql.com/docs/apollo-server/v3/data/resolvers#the-context-argument
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req, res) => ({
        db: await postgres(process.env.POSTGRES_URL!)
    })
});

// https://github.com/apollo-server-integrations/apollo-server-integration-next/issues/229
export async function GET(request: NextRequest) {
    return handler(request)
}

export async function POST(request: NextRequest) {
    return handler(request)
}