'use client'
import { useRouter } from "next/navigation";

export default function Edit() {
    const router = useRouter();
    router.push('/finance/registers/');
    return (
        <></>
    )
}