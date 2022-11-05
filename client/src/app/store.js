import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { forexApi } from '../services/forexApi';
import { stocksApi } from '../services/stocksApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [forexApi.reducerPath]: forexApi.reducer,
        [stocksApi.reducerPath]: stocksApi.reducer,
    },
})