import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://bb-finance.p.rapidapi.com'

// export const rapidApiStocks = createApi({
//     reducerPath: 'rapidApiStocks',
//     baseQuery: fetchBaseQuery({ baseUrl,
//     prepareHeaders: (headers) =>{
//         headers.set('X-RapidAPI-Key', 'abbff403f6msh5e1367cddd96b1cp103d18jsn9f50505b47d3')
//         headers.set('X-RapidAPI-Host', 'bb-finance.p.rapidapi.com')
//         return headers
//     }}),
//     endpoints: (builder) => ({
//         getMovers: builder.query({
//             query: ({id, template}) => `/market/get-movers/${id}/${template}`
//         }),
//     }),
// });
const rapidApiStocksHeaders = {
    'X-RapidAPI-Key': 'abbff403f6msh5e1367cddd96b1cp103d18jsn9f50505b47d3',
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  }

// const rapidApiStocksParams = {
//     id: 'nky:ind', 
//     template: 'STOCK'
// }
const createRequest = (url) => ({url, headers: rapidApiStocksHeaders})
export const rapidApiStocks = createApi({
    reducerPath: 'rapidApiStocks',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getMovers: builder.query({
            query: () => createRequest(`/market/get-trending-tickers/`),
        })
    })
})

export const {
    useGetMoversQuery
} = rapidApiStocks;
