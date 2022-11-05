import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiStocksHeaders = {
    'X-RapidAPI-Key': 'abbff403f6msh5e1367cddd96b1cp103d18jsn9f50505b47d3',
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
}

const baseUrl = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com'

const createRequest = (url) => ({url, headers: rapidApiStocksHeaders})

export const rapidApiStocks = createApi({
    reducerPath: 'rapidApiStocks',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getRecommendations: builder.query({
            query: () => createRequest(`/stock/v2/get-recommendations`),
        }),
    })
});

export const {
    useGetRecommendationsQuery
} = rapidApiStocks;