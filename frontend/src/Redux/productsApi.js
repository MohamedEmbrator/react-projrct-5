import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get All Data
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getProductsByName: builder.query({
      query: (name) => `products`
    })
  })
});
// Get one Product only
export const oneProductApi = createApi({
  reducerPath: "oneProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getOneProduct: builder.query({
      query: (id) => `products/${id}`
    })
  })
});

export const { useGetProductsByNameQuery } = productsApi;
export const { useGetOneProductQuery } = oneProductApi;
