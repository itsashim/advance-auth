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
    verifyEmail: builder.mutation({
      query: (verificationCode) => ({
        url:"/verify-email",
        method: 'POST',
        body: verificationCode,
      }),
      invalidatesTags: ["User"]
    }),
    getUser: builder.query({
      query: () => "/check-auth",
      providesTags: ["User"],
    })
  }),
});

export const { useSignupMutation, useVerifyEmailMutation,useGetUserQuery} = authApi;
export default authApi;
