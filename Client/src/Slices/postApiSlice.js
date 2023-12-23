import { apiSlice } from "./apiSlice";
const HOME_URL = "/api/home";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    viewPosts: builder.mutation({
      query: () => ({
        url: `${HOME_URL}/allPosts`,
        method: "GET",
      }),
    }),
    createPosts:builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/createPosts`,
        method: "POST",
        body: data,
      }),
    }),
    createComments:builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/createComment`,
        method: "POST",
        body: data,
      }),
    }),
    getCommentPost: builder.mutation({
      query: (params) => ({
        url: `${HOME_URL}/getPostComments?id=${params.id}`,
        method: "GET",
      }),
    }),
    likePost: builder.mutation({
      query: (data) => ({
        url: `${HOME_URL}/likePost`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useViewPostsMutation, useCreatePostsMutation, useCreateCommentsMutation, useGetCommentPostMutation, useLikePostMutation } = postApiSlice;
