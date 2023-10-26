'use client';
import { Footer } from '@/components/Global/Footer/Footer';
import { Global } from '@/components/Global/Main';
import { Navbar } from '@/components/Global/Navbar/Navbar';
import ReactQueryProvider from '@/utils/queryProvider';
import { Inter } from 'next/font/google';
import './globals.scss';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import animationData from '../../public/loader/loader_carmen.json';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  const [isAnim, setIsAnim] = useState<boolean>(true);
  const anim = useRef<AnimationItem>();
  const animationContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const animRef = anim.current;
    if (anim.current === undefined) {
      anim.current = lottie.loadAnimation({
        container: animationContainer.current as Element,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData,
      });
      if (isAnim) {
        anim.current.addEventListener('complete', () => {
          animationContainer.current?.parentElement?.remove();
          setIsAnim(false);
        });
      }
    }

    return () => animRef?.destroy();
  }, [isAnim]);

  useEffect(() => {
    if (anim.current) {
      anim.current.loop = false;
    }
  }, []);

  const path = usePathname();

  const pageName = () => {
    if (path === '/') return 'Restaurant des Abattoirs';

    const pathTrim = path.replace('/', '');
    const words = pathTrim.split('-');
    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');
  };

  return (
    <html lang="fr">
      <title>Chez Carmen - {pageName()}</title>
      <meta
        name="description"
        content="Entre plats canaille et pièces du boucher, retrouvez l'ambiance bistrot et la cuisine généreuse de cette institution toulousaine créée en 1956."
      />
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
        <div className="absolute top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-cream-carmen">
          <div className="h-1/2 w-1/2" ref={animationContainer}></div>
        </div>
        <ReactQueryProvider>
          <Navbar isAnim={isAnim} key={'navbar'} />
          <Global isAnim={isAnim} key={'main'}>
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
