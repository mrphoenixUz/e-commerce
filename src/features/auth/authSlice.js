import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            state.isAuthenticated = true;
            state.user = payload.user;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        initializeAuth: (state) => {
            if (typeof window !== 'undefined') {
                state.isAuthenticated = !!localStorage.getItem('token');
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.isAuthenticated = true;
                    state.user = payload.user;
                }
            )
            .addMatcher(
                authApi.endpoints.signup.matchFulfilled,
                (state, { payload }) => {
                    state.isAuthenticated = true;
                    state.user = payload.user;
                }
            );
    },
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;