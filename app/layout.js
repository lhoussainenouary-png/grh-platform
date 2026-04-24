import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'Questionnaire de Communication Managériale',
  description: 'Enquête sur les pratiques de communication au sein de votre organisation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  )
}