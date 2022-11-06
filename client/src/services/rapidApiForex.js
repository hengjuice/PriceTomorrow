import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiForexHeaders = {
    'X-RapidAPI-Key': 'abbff403f6msh5e1367cddd96b1cp103d18jsn9f50505b47d3',
    'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
}
const baseUrl = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com'

const rapidApiForexParams = {
    from: 'USD',
    to: 'EUR,GBP,JPY'
}

const createRequest = (url) => ({url, headers: rapidApiForexHeaders, params: rapidApiForexParams })

export const rapidApiForex = createApi({
    reducerPath: 'rapidApiForex',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getRecentRates: builder.query({
            query: () => createRequest(`/latest`),
        }),
    }),
});

export const {
    useGetRecentRatesQuery
} = rapidApiForex;
