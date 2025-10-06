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
  title: "RemesasVE Pro - Comparador de Remesas a Venezuela",
  description: "Compara en tiempo real las tasas de cambio de todos los servicios de remesas a Venezuela. Ahorra hasta 8% en cada envío. 100% seguro y transparente.",
  keywords: "remesas venezuela, enviar dinero venezuela, tasa cambio venezuela, dolares venezuela, zoom, reserve, airtm, binance p2p",
  authors: [{ name: "RemesasVE Pro" }],
  openGraph: {
    title: "RemesasVE Pro - Comparador de Remesas a Venezuela",
    description: "Compara tasas de cambio y ahorra hasta 8% en cada envío a Venezuela",
    type: "website",
    locale: "es_VE",
    siteName: "RemesasVE Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "RemesasVE Pro - Comparador de Remesas",
    description: "Compara tasas y ahorra en tus envíos a Venezuela",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
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
