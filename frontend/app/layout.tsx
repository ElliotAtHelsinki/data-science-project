import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: '',
  description: '',
}

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en' className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
export default RootLayout
