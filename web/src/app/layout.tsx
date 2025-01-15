import '@solana/wallet-adapter-react-ui/styles.css';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { SolanaProvider } from "@/components/solana-provider";
import { Toaster } from "sonner";
// import App from './App';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VerifiChain - Blockchain Product Authentication',
  description: 'Verify product authenticity using blockchain technology',
};

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SolanaProvider>
            {/* <App /> */}
            {children}
            <Toaster />
          </SolanaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}