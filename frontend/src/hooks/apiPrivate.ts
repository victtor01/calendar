import { useEffect } from "react";
import api from "@/api";

const refreshToken = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    const configApi = {
      method: "post",
      url: process.env.REACT_APP_HTTP + "/auth/refresh",
      headers: { Authorization: `Bearer ${refresh_token}` },
      data: {
        access_token,
        refresh_token,
      },
    };

    const { data } = await api(configApi);
    localStorage.setItem("access_token", data.access_token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function useApiPrivate() {
  useEffect(() => {
    const interceptorRequest = api.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          const token = localStorage.getItem("access_token");
          config.headers["Authorization"] = `Bearer ${token}`;
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
              localStorage.setItem("access_token", access_token);
              originalConfig.headers[
                "Authorization"
              ] = `Bearer ${access_token}`;
              return api(originalConfig);
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
