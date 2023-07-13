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
