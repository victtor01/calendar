"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="pt-br">
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
