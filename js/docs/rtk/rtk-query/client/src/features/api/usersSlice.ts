import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    getUser: builder.query({
      query: (userId) => `/posts/${userId}`,
      //   providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = extendedApiSlice;
