import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./auth/authSlice";
import { URL_API } from "../utils";
const baseQuery = fetchBaseQuery({
  baseUrl: URL_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
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
    const token = localStorage.getItem("token");
    console.log(user);
    let obj = {
      email: user.email,
      password: token,
    };
    const refreshToken = await baseQuery(
      {
        url: `${URL_API}/login`,
        method: "POST",
        body: obj,
      },
      api,
      extraOptions
    );
    if (refreshToken.data) {
      const user = api.getState().user;
      api.dispatch(setCredentials({ ...refreshToken.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Departments", "User", "Branches", "Tasks"],
  endpoints: (builder) => ({}),
});