import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The DoomsdAI Clock',
  description: 'An AI-powered reimagining of the Doomsday Clock',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-cyber-darker text-white min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
} 