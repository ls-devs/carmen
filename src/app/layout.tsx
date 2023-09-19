import { Footer } from '@/components/Global/Footer/Footer';
import { Main } from '@/components/Global/Main';
import { Navbar } from '@/components/Global/Navbar/Navbar';
import ReactQueryProvider from '@/utils/queryProvider';
import { Inter } from 'next/font/google';
import './globals.scss';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chez Carmen - Restaurant des Abattoirs',
  description:
    "Entre plats canaille et pièces du boucher, retrouvez l'ambiance bistrot et la cuisine généreuse de cette institution toulousaine créée en 1956.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <meta property="og:title" content="Chez Carmen" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://www.chezcarmen.fr" />
      <meta
        property="og:image"
        content="https://wpcarmen.wasabi-artwork.com/wp-content/uploads/2023/07/carmen_logo_red_4x-300x115.png"
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:description" content="Chez Carmen" />
      <meta name="viewport"/>
      <link rel="icon" href="/img/favicon.png" sizes="any" />

      <body className={inter.className}>
        <ReactQueryProvider>
          <Navbar key={'navbar'} />
          <Main key={'main'}>{children}</Main>
          <Footer key={'footer'} />
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
