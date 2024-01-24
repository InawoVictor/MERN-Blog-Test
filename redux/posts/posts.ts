import {Post} from "./postTypes"



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3000/api` }),
    tagTypes: ["Posts", "PostId"],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => `/posts`,
            providesTags: ["Posts"]
        }),
        getPost: builder.query<Post, void>({
            query: (id) => `/posts/${id}`,
            providesTags: ["PostId"]
        }),
        createPost: builder.mutation({
            query: (body) => ({
                url: `/posts/`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: [ "Posts"],
        }),  
        updatePost: builder.mutation({
            query: (body) => ({
                url: `/posts/${body.id}`,
                method: "PUT",
                body: {...body},
            }),
            invalidatesTags: ["Posts"],
        }),   
        deletePost: builder.mutation({
            query: (body) => ({
                url: `/posts/${body.id}`,
                method: "DELETE",
                body: {...body},
            }),
            invalidatesTags: ["PostId", "Posts"],
        }),      
    }),
})

export const { 
    useGetPostsQuery, 
    useGetPostQuery, 
    useCreatePostMutation, 
    useUpdatePostMutation ,
    useDeletePostMutation,
} = postApi