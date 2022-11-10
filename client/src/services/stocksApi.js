import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:8000';

const createRequest = (url) => ({url})

export const stocksApi = createApi({
    reducerPath: 'stocksApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getStocks: builder.query({
            query: ({ ticker, period }) => createRequest(`/stocks?ticker=${ticker}&period=${period}`),
        }),
    }),
});

export const {
    useGetStocksQuery
} = stocksApi