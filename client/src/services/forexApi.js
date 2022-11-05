import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TODO: add server URL
const baseUrl = '';

const createRequest = (url) => ({url})

export const forexApi = createApi({
    reducerPath: 'forexApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getForex: builder.query({
            query: () => createRequest('/forex')
        }),
        
    })
});