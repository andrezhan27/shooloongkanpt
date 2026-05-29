import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";

const privacyPolicyUrl = process.env.PRIVACY_POLICY_LINK;

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
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3L8BRL72KP"
          strategy="beforeInteractive"
        />
        <Script id="google-tag" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-3L8BRL72KP');`}
        </Script>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WRCW76P');`}
        </Script>
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/09eab770664038146e3e4b69c410e3c9/script.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WRCW76P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer privacyPolicyUrl={privacyPolicyUrl} />
        </LanguageProvider>
      </body>
    </html>
  );
}
