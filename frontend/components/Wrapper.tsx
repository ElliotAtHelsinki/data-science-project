import { Box } from '@chakra-ui/react'

interface Props {
  children?: React.ReactNode
  variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<Props> = ({ children, variant = 'regular' }) => {
  return (
    <Box w='100%' maxW={variant == 'small' ? 400 : 800} mt={8} mx='auto'>
      {children}
    </Box>
  )
}