// https://www.npmjs.com/package/@as-integrations/next

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server';
import postgres from 'postgres';
import { Resolvers } from '../../../types';
import { exerciseData } from '@/app/lib/definitions';

const resolvers = {
    Query: {
        getExercises: async (parent: any, args: any, context: any ) => { 
            return await context.db<exerciseData[]>`SELECT * FROM public.exercises`
        }
    }
}

const typeDefs = `#graphql
    type Exercise {
        exercisename: String
        force: String 
        level: String 
        mechanic: String 
        equipment: String 
        primaryMuscles: [String] 
        secondaryMuscles: [String] 
        instructions: [String] 
        category: String 
        images: [String] 
        exerciseid: String
    }

    type Query {
        getExercises: [Exercise]
    }
`;

const server = new ApolloServer({
    resolvers,
    typeDefs
});

// https://www.apollographql.com/docs/apollo-server/v3/data/resolvers#the-context-argument
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req) => ({
        req,
        db: await postgres(process.env.PG_URL!)
    }),
});

// https://github.com/apollo-server-integrations/apollo-server-integration-next/issues/229
export async function GET(request: NextRequest) {
    handler(request)
}

export async function POST(request: NextRequest) {
    handler(request)
}