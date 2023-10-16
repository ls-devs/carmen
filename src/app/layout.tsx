import { Inter } from 'next/font/google';
import './(all)/globals.scss';
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
    <html lang="fr" className="h-full overflow-hidden">
      <meta property="og:title" content="Chez Carmen" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://www.chezcarmen.fr" />
      <meta
        property="og:image"
        content="https://wpcarmen.wasabi-artwork.com/wp-content/uploads/2023/07/carmen_logo_red_4x-300x115.png"
      />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:description" content="Chez Carmen" />
      <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
      <link rel="icon" href="/img/favicon.png" sizes="any" />

      <body className={`${inter.className} h-full overflow-hidden`}>
        {children}
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
