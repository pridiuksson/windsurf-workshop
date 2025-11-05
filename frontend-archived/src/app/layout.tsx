import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { SupabaseProvider } from '@/components/providers/SupabaseProvider'
import { GameProvider } from '@/components/providers/GameProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'D&D Chat Game',
  description: 'A multiplayer Dungeons & Dragons chat game with AI Dungeon Master',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <GameProvider>
            {children}
            <Toaster position="top-right" />
          </GameProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
