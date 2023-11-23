"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import NextTopLoader from "nextjs-toploader";
import "../styles/nprogress.css";
import "./globals.css";
import "moment/locale/pt-br";
import "moment-timezone";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="pt-br">
        <body>
          <NextTopLoader color="#17919f" showSpinner={false} crawl={false} />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
