import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_API_BASE_URL || 'https://phoenix-shop-backend.onrender.com',
        prepareHeaders: (headers, { getState }) => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { 
    useSignupMutation, 
    useLoginMutation, 
    useLogoutMutation 
} = authApi;