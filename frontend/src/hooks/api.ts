import { apiPrivate } from "@/api";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";

async function refreshToken() {
  try {
    const cookies = parseCookies();
    const access_token = cookies.access_token;
    const refresh_token = cookies.refresh_token;

    console.log(access_token)

    const { data } = await apiPrivate.post(
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

let _retry = true;

const interceptorRequest = apiPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      const { access_token } = parseCookies();
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

const interceptorResponse = apiPrivate.interceptors.response.use(
  (response) => response,
  async (err: any) => {
    const originalConfig = err.config;
    if (err.response && _retry) {
      _retry = false;
      if (err.response.status === 401) {
        const access_token = (await refreshToken())?.access_token || null;

        if (access_token) {
          Cookies.set("access_token", access_token);
          originalConfig.headers["Authorization"] = `Bearer ${access_token}`;
          _retry = true;
          return apiPrivate(originalConfig);
        }
      }
    }
    return await Promise.reject(err);
  }
);

// Retornar uma função de limpeza para remover os interceptadores quando necessário
export const cleanupapiPrivatePrivate = () => {
  apiPrivate.interceptors.response.eject(interceptorResponse);
  apiPrivate.interceptors.request.eject(interceptorRequest);
};

export default apiPrivate;
