import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REME LAT-USA - Comparador de Tasas de Cambio Latinoamérica",
  description: "Compara en tiempo real tasas de cambio de 60+ casas de cambio en 14 países de Latinoamérica y USA. Encuentra la mejor tasa. 100% transparente, sin comisiones.",
  keywords: "remesas latinoamerica, tasas cambio, argentina, brasil, chile, colombia, ecuador, peru, uruguay, venezuela, usa, casas de cambio, dolar hoy, tasa real",
  authors: [{ name: "REME LAT-USA" }],
  manifest: "/manifest.json",
  themeColor: "#2563EB",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "REME LAT-USA",
  },
  openGraph: {
    title: "REME LAT-USA - Comparador de Tasas Latinoamérica",
    description: "Compara tasas de cambio en 14 países. Encuentra la mejor casa de cambio en tiempo real.",
    type: "website",
    locale: "es_419",
    siteName: "REME LAT-USA",
  },
  twitter: {
    card: "summary_large_image",
    title: "REME LAT-USA - Comparador de Tasas",
    description: "Compara tasas de cambio en 14 países de Latinoamérica",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo-reme-lat-usa.svg",
    apple: [
      { url: "/logo-reme-lat-usa.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
