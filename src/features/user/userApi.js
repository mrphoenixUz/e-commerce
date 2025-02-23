import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3003',
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
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => '/users/profile',
            providesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: '/users/update',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        updateProfilePicture: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: '/users/upload',
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
            invalidatesTags: ['User']
        })
    }),
});

export const { 
    useGetUserQuery, 
    useUpdateUserMutation,
    useUpdateProfilePictureMutation 
} = userApi;