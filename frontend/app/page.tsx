import { TripCountChart, Wrapper } from '@/components'
import { sampleAnnualTripCountData } from '@/constants'
import { Box, Flex, Heading } from '@chakra-ui/react'

const Home: React.FC = () => {
  return (
    <Box w='100%'>
      <Wrapper>
        <Flex justifyContent='center'>
          <Heading as='h3' size='lg'>Trip Count in July 2023</Heading>
        </Flex>
        <TripCountChart data={sampleAnnualTripCountData} />
      </Wrapper>
    </Box>
  )
}
export default Home
