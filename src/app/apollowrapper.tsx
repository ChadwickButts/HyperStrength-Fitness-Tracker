'use client'


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {

    const client = new ApolloClient({
        uri: 'http://localhost:3000/api/graphql',
        headers: { 
            'Allow-Control-Access-Origin': '*'
        },
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}