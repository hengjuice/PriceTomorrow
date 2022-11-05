import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TODO: add server URL
const baseUrl = '';

const createRequest = (url) => ({url})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCrypto: builder.query({
            query: () => createRequest('/crypto')
        }),
        
    })
});