import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TODO: add server URL
const baseUrl = '';

const createReqest = (url) => ({url})

export const stocksApi = createApi({
    reducerPath: 'stocksApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getStocks: builder.query({
            query: () => createRequest('/stocks')
        }),
        
    })
});