import { Inter } from 'next/font/google'
import './globals.css'
import { ReduxProviders } from '@/provider/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Financial Plan PH',
  icons: {
    icon: '/logo.png',
  },
}
export default function RootLayout({ children }) {
  return (
    <ReduxProviders>
      <html lang="en">
        <body className={`${inter.className} bg-gray-100`}>{children}</body>
      </html>
    </ReduxProviders>
  )
}
