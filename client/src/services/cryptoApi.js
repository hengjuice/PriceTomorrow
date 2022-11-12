import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:8000/';

const createRequest = (url) => ({url})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCrypto: builder.query({
            query: ({ model, symbol, interval, start_str, end_str }) => createRequest(`single-crypto?model=${model}&symbol=${symbol}&interval=${interval}&start_str=${start_str}&end_str=${end_str}`)
        }),
        
    })
});

export const {
    useGetCryptoQuery
} = cryptoApi