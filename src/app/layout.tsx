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
  title: "Reme Global - Remesas Internacionales",
  description: "Compara en tiempo real las tasas de cambio de todos los servicios de remesas a Venezuela. Ahorra hasta 8% en cada envío. 100% seguro y transparente.",
  keywords: "remesas venezuela, enviar dinero venezuela, tasa cambio venezuela, dolares venezuela, zoom, reserve, airtm, binance p2p, reme global",
  authors: [{ name: "Reme Global" }],
  manifest: "/manifest.json",
  themeColor: "#6366f1",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Reme Global",
  },
  openGraph: {
    title: "Reme Global - Remesas Internacionales",
    description: "Compara tasas de cambio y ahorra hasta 8% en cada envío a Venezuela",
    type: "website",
    locale: "es_VE",
    siteName: "Reme Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reme Global - Remesas Internacionales",
    description: "Compara tasas y ahorra en tus envíos a Venezuela",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
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
