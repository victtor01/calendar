"use client";
import { useEffect } from "react";
import api from "@/api";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";

export async function refreshToken() {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const refresh_token = cookies.refresh_token;

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
          //Get access token of cookies
          const { access_token } = parseCookies();

          //create auth in header request
          config.headers["Authorization"] = `Bearer ${access_token}`;
        }

        //return config of request
        return config;
      },
      (err) => Promise.reject(err)
    );

    let _retry = false;

    const interceptorResponse = api.interceptors.response.use(
      (response) => response,
      //execute err function
      async (err: any) => {

        //get config of err request
        const originalConfig = err.config;
        
        if (err.response) {
          //if not is secound request of error and status is 401
          if (err.response.status === 401 && !_retry) {
            _retry = true;
            //refresh token access
            const { access_token } = await refreshToken();
            
            //is token , request again
            if (access_token) {
              //set refreash token in cookies
              Cookies.set("access_token", access_token);
              //modify header of request
              originalConfig.headers[
                "Authorization"
              ] = `Bearer ${access_token}`;
              // request again
              return api(originalConfig);
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
