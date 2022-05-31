import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {onBoardingApi} from './slices/OnboardingSlice';

export const store = configureStore({
  reducer: {
    [onBoardingApi.reducerPath]: onBoardingApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(onBoardingApi.middleware),
});

setupListeners(store.dispatch);
