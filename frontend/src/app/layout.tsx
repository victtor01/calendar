"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import NextTopLoader from "nextjs-toploader";
import "../styles/nprogress.css";
import "./globals.css";
import { motion } from "framer-motion";

const variants = {
  pageInitial: { opacity: 0, x: -200, y: 0 },
  pageAnimate: { opacity: 1, x: 0, y: 0 },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="pt-br">
        <body>
          <motion.main
            variants={variants}
            initial="pageInitial"
            animate="pageAnimate"
          >
            <NextTopLoader color="#17919f" showSpinner={false} crawl={false} />
            {children}
          </motion.main>
        </body>
      </html>
    </QueryClientProvider>
  );
}
