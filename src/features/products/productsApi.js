import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3003',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Cart', 'User'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: '/users/cart',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartItem: builder.mutation({
      query: (data) => ({
        url: '/users/cart',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `/users/cart/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    addToFavourites: builder.mutation({
      query: (data) => ({
        url: `/users/favourites`,
        method: 'POST',
        body: data,
      }),
    }),
    removeFromFavourites: builder.mutation({
      query: (productId) => ({
        url: `/users/favourites/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"], // This ensures the UI updates automatically
    }),
    getCategories: builder.query({
      query: () => '/categories',
    }),
    searchProduct: builder.query({
      query: (searchTerm) => `/products/search/${searchTerm}`,
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useAddToFavouritesMutation,
  useRemoveFromFavouritesMutation,
  useGetCategoriesQuery,
  useSearchProductQuery
} = productsApi;