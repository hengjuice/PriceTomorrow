import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TODO: add server URL
const baseUrl = '';

const createReqest = (url) => ({url})

export const stocksApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCrypto: builder.query({
            query: () => createRequest('/crypto')
        }),
        
    })
});