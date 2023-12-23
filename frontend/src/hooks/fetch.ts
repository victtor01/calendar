import { Server } from "@/constants/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

interface TokenProps {
  access_token: string | null;
  refresh_token?: string | null;
}

function getTokens() {
  const accessToken: RequestCookie | undefined = cookies().get("access_token");
  const access_token: string | null = accessToken?.value || null;

  const refreshToken: RequestCookie | undefined =
    cookies().get("refresh_token");
  const refresh_token: string | null = refreshToken?.value || null;

  return {
    access_token,
    refresh_token,
  };
}

export default async function fetchs(url: string) {
  const { access_token }: TokenProps = getTokens();

  try {
    const res = await fetch(`${Server}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (res.status !== 401) return res.json();

    throw new Error(res.statusText);
  } catch (error) {
    return {
      error: error,
    };
  }
}

export async function refreshToken() {
  const { access_token, refresh_token }: TokenProps = getTokens();

  const res = await fetch(`${Server}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh_token}`,
    },
    body: JSON.stringify({
      access_token,
      refresh_token,
    }),
  });

  console.log(res);

  /*  const { data } = await api.post(
    "/auth/refresh",
    {
      access_token,
      refresh_token,
    },
    {
      headers: { Authorization: `Bearer ${refresh_token}` },
    }
  ); */
  /* 
  return data; */
}
