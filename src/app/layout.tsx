import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsentBanner from "../components/CookieConsentBanner";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import { SOCIAL_LINKS } from "@/lib/social-links";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: ["/heroimage.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/heroimage.png"],
  },
};

const musicGroupJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/62moonslogo.png`,
  genre: "Heavy Metal",
  foundingLocation: {
    "@type": "Place",
    name: "Chicago, Illinois",
  },
  member: [
    { "@type": "Person", name: "Nate" },
    { "@type": "Person", name: "Tommy" },
    { "@type": "Person", name: "Pilot Pete" },
  ],
  sameAs: SOCIAL_LINKS.map((link) => link.href),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupJsonLd) }}
        />
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
