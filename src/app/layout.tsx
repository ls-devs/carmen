'use client';
import { Footer } from '@/components/Global/Footer/Footer';
import { Global } from '@/components/Global/Main';
import { Navbar } from '@/components/Global/Navbar/Navbar';
import ReactQueryProvider from '@/utils/queryProvider';
import { Inter } from 'next/font/google';
import './globals.scss';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.JSX.Element;
  params: {
    isAnim: boolean;
  };
}) {
  const [isAnim, setIsAnim] = useState<boolean>(true);
  useEffect(() => {
    params.isAnim = isAnim;
  }, [isAnim, params]);
  return (
    <html lang="fr">
      <meta property="og:title" content="Chez Carmen" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://www.chezcarmen.fr" />
      <meta
        property="og:image"
        content="https://wpcarmen.wasabi-artwork.com/wp-content/uploads/2023/07/carmen_logo_red_4x-300x115.png"
      />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:description" content="Chez Carmen" />
      <link rel="icon" href="/img/favicon.png" sizes="any" />

      <body className={`${inter.className}`}>
        <ReactQueryProvider>
          <Navbar isAnim={isAnim} key={'navbar'} />
          <Global
            params={params}
            isAnim={isAnim}
            setIsAnim={setIsAnim}
            key={'main'}
          >
            {children}
          </Global>
          <Footer isAnim={isAnim} key={'footer'} />
        </ReactQueryProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SXCHXQWQSF" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-SXCHXQWQSF');
        `}
        </Script>
      </body>
    </html>
  );
}
