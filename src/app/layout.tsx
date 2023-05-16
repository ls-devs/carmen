import QueryProvider from "@/utils/queryProvider"
import "./globals.scss"
import {Inter} from "next/font/google"

const inter = Inter({subsets: ["latin"]})

export const metadata = {
  title: "Chez Carmen",
  description: "Restaurant des Abattoirs",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
