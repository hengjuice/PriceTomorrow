import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:8000/';

const createRequest = (url) => ({url})

export const forexApi = createApi({
    reducerPath: 'forexApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getForex: builder.query({
            query: ({ model, ticker, period }) => createRequest(`forex?model=${model}&ticker=${ticker}&period=${period}`)
        }),
    })
});

export const {
    useGetForexQuery
} = forexApi