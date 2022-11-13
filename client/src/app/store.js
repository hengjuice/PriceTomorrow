import { configureStore } from '@reduxjs/toolkit';
import { rapidApi } from '../services/rapidApi';
import { rapidApiStocks } from '../services/rapidApiStocks';
import {rapidApiForex} from '../services/rapidApiForex';
import { forexApi } from '../services/forexApi';
import { stocksApi } from '../services/stocksApi';
import { cryptoApi } from '../services/cryptoApi';
import { pairsApi } from '../services/pairsApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [forexApi.reducerPath]: forexApi.reducer,
        [stocksApi.reducerPath]: stocksApi.reducer,
        [rapidApi.reducerPath]: rapidApi.reducer,
        [rapidApiStocks.reducerPath]: rapidApiStocks.reducer,
        [rapidApiForex.reducerPath]: rapidApiForex.reducer,
        [pairsApi.reducerPath]: pairsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(rapidApi.middleware)
        .concat(rapidApiStocks.middleware)
        .concat(rapidApiForex.middleware)
        .concat(stocksApi.middleware)
        .concat(cryptoApi.middleware)
        .concat(forexApi.middleware)
        .concat(pairsApi.middleware)
})