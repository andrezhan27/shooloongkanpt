import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Shoo Loong Kan Portugal | Autêntico Hot Pot Chinês",
  description:
    "Premium Chinese hotpot in Lisbon with traditional Sichuan ritual, rich broths, and an intimate red-and-wood dining room."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/09eab770664038146e3e4b69c410e3c9/script.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
