import "./globals.scss";
import {Inter} from "next/font/google";
import {Navbar} from "@/components/Global/Navbar";
import {Footer} from "@/components/Global/Footer";
import {Main} from "@/components/Global/Main";
import ReactQueryWrapper from "@/utils/queryProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Chez Carmen",
  description: "Restaurant des Abattoirs",
};

export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="fr">
      <body className={inter.className}>
          <ReactQueryWrapper>
            <Navbar />
              <Main>{children}</Main>
            <Footer />
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
