import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import AuthProvider from '@/components/AuthProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Netflix-Clone',
  description: 'A video streaming platform which consists of tons of different genres of movies and series',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <link rel="icon" href="/images/favicon.ico" sizes="any" />

          {children}
        </body>
      </html>
    </>
  )
}
