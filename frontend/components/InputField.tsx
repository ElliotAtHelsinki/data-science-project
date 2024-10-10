'use client'
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useField } from 'formik'

type Props = React.InputHTMLAttributes<HTMLInputElement> & { name: string, label: string, isTextArea?: boolean }

export const InputField: React.FC<Props> = ({size: _, isTextArea=false, ...props}) => {
  const [field, { error }] = useField(props)
  const { label, placeholder } = props

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} placeholder={placeholder} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}