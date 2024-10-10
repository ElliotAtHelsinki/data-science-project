import type { Metadata } from 'next'
import { Providers } from './providers'
import { Flex } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: '',
  description: '',
}

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Flex justifyContent='center' width='100%' padding={4} minH='calc(100vh - 72px)'>
            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  )
}
export default RootLayout
