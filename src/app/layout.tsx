import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsentBanner from "../components/CookieConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "62 Moons | Metal Band",
  description:
    "62 Moons - Heavy metal from Chicago. Nate, Tommy, and Pilot Pete delivering crushing riffs and thunderous drums.",
  icons: {
    icon: "/62moonslogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="gtag-consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var storedConsent;
            try { storedConsent = localStorage.getItem("62moons-cookie-consent"); } catch (e) {}
            gtag('consent', 'default', {
              analytics_storage: storedConsent === 'granted' ? 'granted' : 'denied'
            });`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B50J4CGKJ4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`gtag('js', new Date());
            gtag('config', 'G-B50J4CGKJ4');`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieConsentBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
