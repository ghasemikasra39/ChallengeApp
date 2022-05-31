import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const onBoardingApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6296455175c34f1f3b2cb120.mockapi.io/',
  }),
  endpoints: builder => ({
    getData: builder.query({
      query: () => 'data',
    }),
  }),
});

export const {useGetDataQuery} = onBoardingApi;
