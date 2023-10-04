
'use client'
import Cookies from "js-cookie"
export default function Home() {
    const logout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token')
    }
    return (
        <>
            <button onClick={logout}>
                SAIR
            </button>
        </>
    )
}