import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:8000/';

const createRequest = (url) => ({url})

export const pairsApi = createApi({
    reducerPath: 'pairsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getPairsData: builder.query({
            query: () => createRequest(`pairs-data`)
        }),

        getPairsCluster: builder.query({
            query: () => createRequest(`pairs-cluster`)
        }),

        getPairsBar: builder.query({
            query: () => createRequest(`pairs-bar`)
        }),
    })
});

export const {
    useGetPairsDataQuery,
    useGetPairsClusterQuery,
    useGetPairsBarQuery
} = pairsApi