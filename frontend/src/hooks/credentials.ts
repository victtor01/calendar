import { cookies } from 'next/headers'

export function useCredentials () {
   function getCredentials() {
    'use client'
       const cookieStore = cookies();
       const access_token = cookieStore.get('access_token');
       const refresh_token = cookieStore.get('refresh_token');

       console.log(access_token, refresh_token);
    
       return {
           access_token,
           refresh_token
       }
   }

   return {
    getCredentials
   }
}
