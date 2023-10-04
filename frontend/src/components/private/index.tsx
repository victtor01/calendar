
import { cookies } from "next/headers";
import { Loading } from "./redirect";

export default function Private({ children }: { children: React.ReactNode }) {
  const access_token = cookies().get('access_token');
  console.log(access_token);

  return (
    <>
      {access_token ? children : <Loading access_token={access_token}/>}
    </>
  )
}
