'use client'

import { InputField, TripCountChart, Wrapper } from '@/components'
import { sampleAnnualTripCountData } from '@/constants'
import { Box, Button, Flex, FormErrorMessage, FormLabel, Heading, Text } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useState } from 'react'

interface Response {
  timestamp: string
  departingCount: number
  returningCount: number
  bikeAtStationCount: number
}

const Home: React.FC = () => {
  const [predictionData, setPredictionData] = useState<Response>()

  return (
    <Box w='100%'>
      <Wrapper>
        <Flex justifyContent='center'>
          <Heading as='h3' size='lg'>Kamppi Trip Count in July 2023</Heading>
        </Flex>
        <TripCountChart data={sampleAnnualTripCountData} />
        <Formik
          initialValues={{ timestamp: '' }}
          onSubmit={async ({ timestamp }, { setErrors }) => {
            const response: Response = await (await fetch(`http://localhost:8000/app/predict?timestamp=${timestamp}`)).json()
            setPredictionData(response)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Flex flexDir='column' alignItems='center' mt={4}>
                <FormLabel htmlFor='timestamp'>Enter timestamp to get prediction</FormLabel>
                {/* @ts-ignore */}
                <InputField name='timestamp' label='' placeholder='YYYY-MM-DD HH:MM:SS' textAlign='center' />
                <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting} disabled={isSubmitting}>Submit</Button>
                {
                  predictionData &&
                  <Box mt={4}>
                    <Text>Timestamp: {predictionData.timestamp}</Text>
                    <Text>Number of Bikes Arriving at Station: {predictionData.returningCount}</Text>
                    <Text>Number of Bikes Departing from Station: {predictionData.departingCount}</Text>
                    <Text>Predicted Number of Bikes at Station: {predictionData.bikeAtStationCount}</Text>
                    <Text>Bike Count Status: {predictionData.departingCount > predictionData.returningCount ? 'Decreasing' : 'Increasing'}</Text>
                    <Text>
                      In need of more bikes: &nbsp;
                      {
                        predictionData.bikeAtStationCount > 10 ? 'No' :
                          predictionData.bikeAtStationCount > 5 ? 'Yes, but not urgently.' :
                            'Yes, urgently.'
                      }
                    </Text>
                  </Box>
                }
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  )
}
export default Home
