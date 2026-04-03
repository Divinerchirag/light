import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { ThemeProvider } from '@/context/ThemeContext';
import LenisProvider from '@/components/providers/LenisProvider';
import { LenisScrollSync } from '@/hooks/useLenisScroll';

export const metadata: Metadata = {
  title: "Chirag Yadav - Portfolio",
  description: "Chirag Yadav - Software Engineer & Photographer Portfolio (chiragyadav.dev)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var saved = localStorage.getItem('portfolio-theme');
              document.documentElement.setAttribute('data-theme', saved || 'light');
            } catch(e) {}
          })();
        ` }} />
      </head>
      <body
        className={`${jakarta.variable} ${playfair.variable} ${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LenisProvider>
            <LenisScrollSync />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
