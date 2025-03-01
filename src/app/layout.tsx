import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import QueryProvider from "./QueryProvider";
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Checkout with Portone",
  description: "Checkout with Portone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={lato.className}>
          <Script
            src="https://code.jquery.com/jquery-1.12.4.min.js"
            strategy="beforeInteractive"
          />
          <Script
            src="https://cdn.portone.io/v2/browser-sdk.js"
            strategy="beforeInteractive"
          />
          {children}
        </body>
      </html>
    </QueryProvider>
  );
}
