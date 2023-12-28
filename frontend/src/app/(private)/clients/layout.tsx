'use client'
import Header from "@/components/header";
import UserComponents from "@/components/userComponents";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
