import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get All Data
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mohamedembrator.github.io/json-server/" }),
  endpoints: (builder) => ({
    getProductsByName: builder.query({
      query: (name) => `index.json`
    })
  })
});
// Get one Product only
export const oneProductApi = createApi({
  reducerPath: "oneProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mohamedembrator.github.io/json-server/" }),
  endpoints: (builder) => ({
    getOneProduct: builder.query({
      query: (id) => `/${id}.json`
    })
  })
});

export const { useGetProductsByNameQuery } = productsApi;
export const { useGetOneProductQuery } = oneProductApi;
