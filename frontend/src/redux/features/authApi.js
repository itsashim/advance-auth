import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth/api',credentials: 'include' });

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["User"]
    }),
    login: builder.mutation({
      query: (logUser) => ({
        url: "/login",
        method: 'POST',
        body: logUser,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["User"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["User"]
    }),
    verifyEmail: builder.mutation({
      query: (verificationCode) => ({
        url:"/verify-email",
        method: 'POST',
        body: verificationCode,
      }),
      invalidatesTags: ["User"]
    }),
    sendResetPasswordLink: builder.mutation({
      query: (email)=>({
        url: "/forgot-password",
        method: "POST",
        body: email,
      })
    }),
    resetPassword: builder.mutation({
      query: ({password,token})=>({
        url: `/reset-password/${token}`,
        method: "POST",
        body: {password},
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["User"]
    }),
    getUser: builder.query({
      query: () => "/check-auth",
      providesTags: ["User"],
    })
  }),
});

export const { useSignupMutation, useResetPasswordMutation,useSendResetPasswordLinkMutation,useLogoutMutation,useVerifyEmailMutation,useLoginMutation,useGetUserQuery} = authApi;
export default authApi;
