import { Footer } from '@/components/Global/Footer/Footer';
import { Main } from '@/components/Global/Main';
import { Navbar } from '@/components/Global/Navbar/Navbar';
import ReactQueryProvider from '@/utils/queryProvider';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chez Carmen',
  description: 'Restaurant des Abattoirs',
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
        content="https://champcaine.com/img/champcain_logo.png"
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:description" content="Chez Carmen" />

      <body className={inter.className}>
        <ReactQueryProvider>
          <Navbar key={'navbar'} />
          <Main key={'main'}>{children}</Main>
          <Footer key={'footer'} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
