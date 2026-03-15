import './globals.css'
import Navbar from '@/components/Navbar'

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
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
