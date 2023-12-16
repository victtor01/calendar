"use client";
import { ProviderSessionContext } from "@/contexts/sessionContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import NextTopLoader from "nextjs-toploader";
import "../styles/nprogress.css";
import "./globals.css";
import "moment/locale/pt-br";
import "moment-timezone";
import 'react-toastify/dist/ReactToastify.css';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <ProviderSessionContext>
      <QueryClientProvider client={queryClient}>
        <html lang="pt-br" className="light">
          <body>
            <NextTopLoader color="#17919f" showSpinner={false} crawl={false} />
            {children}
          </body>
        </html>
      </QueryClientProvider>
    </ProviderSessionContext>
  );
}
