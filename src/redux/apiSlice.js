import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./auth/authSlice";

let token;
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_Server_Url,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    const user = JSON.parse(localStorage.getItem("user"));
    const password = JSON.parse(localStorage.getItem("password"));
    const obj = {
      email: user,
      password,
    };
    const refreshToken = await baseQuery(
      {
        url: `${process.env.NEXT_PUBLIC_Server_Url}/login`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: obj,
      },
      api,
      extraOptions
    );
    if (refreshToken.data) {
      const { accessToken, user } = refreshToken.data;
      api.dispatch(
        setCredentials({
          accessToken,
          user,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Departments",
    "Users",
    "Branches",
    "Tasks",
    "Holidays",
    "Attendance",
  ],
  endpoints: (builder) => ({}),
});
