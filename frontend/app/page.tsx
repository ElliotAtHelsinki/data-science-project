'use client'

import { InputField, TripCountChart, Wrapper } from '@/components'
import { sampleAnnualTripCountData } from '@/constants'
import { Box, Button, Flex, FormErrorMessage, FormLabel, Heading, Select, Text } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { useState } from 'react'

interface Response {
  timestamp: string
  station: string
  departingCount: number
  returningCount: number
  bikeAtStationCount: number
  increasing: boolean
}

const Home: React.FC = () => {
  const [predictionData, setPredictionData] = useState<Response>()

  return (
    <Box w='100%'>
      <Wrapper>
        <Formik
          initialValues={{ timestamp: '' }}
          onSubmit={async ({ timestamp }, { setErrors }) => {
            const response: Response = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/app/predict?timestamp=${timestamp}`)).json()
            setPredictionData(response)
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Flex flexDir='column' alignItems='center' mt={4}>
                {/* <Field name='station'>
                  {({ field }) => (
                    <>
                      <FormLabel htmlFor='station'>Station</FormLabel>
                      <Select id='station' placeholder='Select station' {...field}>
                        <option value='Kamppi (M)'>Kamppi (M)</option>
                        <option value='Rautatientori - itä'>Rautatientori - itä</option>
                      </Select>
                    </>
                  )}
                </Field> */}

                <FormLabel htmlFor='timestamp' mt={4} mb={0}>Timestamp</FormLabel>
                <InputField name='timestamp' label='' placeholder='YYYY-MM-DD HH:MM:SS' textAlign='center' />

                <Button type='submit' mt={4} disabled={isSubmitting} isLoading={isSubmitting}>Predict</Button>
                {
                  predictionData &&
                  <Box mt={4}>
                    <Text>Timestamp: {predictionData.timestamp}</Text>
                    <Text>Station: {predictionData.station}</Text>
                    <Text>Predicted Number of Bikes Arriving at Station: {predictionData.returningCount}</Text>
                    <Text>Predicted Number of Bikes Departing from Station: {predictionData.departingCount}</Text>
                    <Text>Predicted Number of Bikes at Station: {predictionData.bikeAtStationCount}</Text>
                    <Text>Predicted Bike Count Status: {predictionData.increasing ? 'Decreasing' : 'Increasing'}</Text>
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
