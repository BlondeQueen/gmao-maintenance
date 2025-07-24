import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { AppProvider } from '../context/AppContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GMAO - Industrie Cameroun",
  description: "Application de Gestion de Maintenance Assistée par Ordinateur pour l'industrie camerounaise - Site de Douala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50`}
      >
        {/* <AppProvider> */}
          {children}
        {/* </AppProvider> */}
      </body>
    </html>
  );
}
