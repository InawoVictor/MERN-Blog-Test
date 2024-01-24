import {  BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { setCredentials, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as any).auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth:BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 403) {

    }

    return result;
}

export const api  = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
})