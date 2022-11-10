import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiForexHeaders = {
    'X-RapidAPI-Key': 'abbff403f6msh5e1367cddd96b1cp103d18jsn9f50505b47d3',
    'X-RapidAPI-Host': 'finviz2.p.rapidapi.com'
  }
const baseUrl = 'https://finviz2.p.rapidapi.com/api/v1'

const rapidApiForexParams = {mode: 'percentage'}

const createRequest = (url) => ({url, headers: rapidApiForexHeaders, params: rapidApiForexParams })

export const rapidApiForex = createApi({
    reducerPath: 'rapidApiForex',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getRecentRates: builder.query({
            query: () => createRequest(`/forex`),
        }),
    }),
});

export const {
    useGetRecentRatesQuery
} = rapidApiForex;
