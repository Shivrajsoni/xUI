import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { RootProvider } from "fumadocs-ui/provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "xUI Components Library | UI components Premium , Free ",
  description: "Designed and Created by Shivraj Soni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<ViewTransitions>
      <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider>
        <ThemeProvider
            attribute="class" 
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
             
              {children}
             
              </div>
          </div>
        </ThemeProvider>
        </RootProvider>
      </body>
    </html>
</ViewTransitions>

  );
}
