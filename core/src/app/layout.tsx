import {ThemeProvider, BaseStyles} from '@primer/react'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Page from '../components/Page';
import HeaderComponent from '../components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Miners Online",
  description: "The official webpage for Miners Online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <BaseStyles>
            <HeaderComponent/>
            <Page>{children}</Page>
          </BaseStyles>
        </ThemeProvider>
      </body>
    </html>
  );
}
