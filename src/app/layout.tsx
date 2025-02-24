import type { Metadata } from "next";
import { Geist, Geist_Mono, Jura, Poppins, Quicksand, Montserrat } from "next/font/google";
import "./globals.css";

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-quicksand',
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aston Martin",
  description: "Site oficial da Aston Martin. Desenvolvido por Víctor Santucci.",
  icons: {
    icon: '/logoicon.png'
  },
  openGraph: {
    images: [
      {
        url: "/layout.jpg", 
        width: 1200, 
        height: 630, 
        alt: "Aston Martin",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/layout.jpg", 
        width: 1200, 
        height: 630,
        alt: "Aston Martin",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jura.variable} ${montserrat.variable} ${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${quicksand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
