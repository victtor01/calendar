"use client";
import { useEffect } from "react";
import api from "@/api";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";

export async function refreshToken() {
  try {
    const cookies =  parseCookies();
    const access_token = cookies.access_token;
    const refresh_token = cookies.refresh_token;

   /* return access_token */

    const { data } = await api.post(
      "/auth/refresh",
      {
        access_token,
        refresh_token,
      },
      {
        headers: { Authorization: `Bearer ${refresh_token}` },
      }
    );

    /* Cookies.set("access_token", data.access_token); */
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function useApiPrivate() {
  useEffect(() => {
    const interceptorRequest = api.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          const { access_token } = parseCookies();
          config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    let _retry = false;

    const interceptorResponse = api.interceptors.response.use(
      (response) => response,
      async (err: any) => {
        const originalConfig = err.config;
        if (err.response) {
          if (err.response.status === 401 && !_retry) {
            _retry = true;
            try {
              const { access_token } = await refreshToken();
              if (access_token) {
                Cookies.set("access_token", access_token);
                originalConfig.headers[
                  "Authorization"
                ] = `Bearer ${access_token}`;
                return api(originalConfig);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorResponse);
      api.interceptors.request.eject(interceptorRequest);
    };
  }, []);

  return api;
}
