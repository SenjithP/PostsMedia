import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/home";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    viewPosts: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/allPosts`,
        method: "GET",
      }),
    }),
    createPosts:builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createPosts`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useViewPostsMutation, useCreatePostsMutation } = postApiSlice;
