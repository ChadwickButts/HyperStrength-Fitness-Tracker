'use client'


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {

    const client = new ApolloClient({
        uri: 'https://hyperstrength-fitness-tracker-git-620399-chadwickbutts-projects.vercel.app/api/graphql',
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}