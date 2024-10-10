'use client'
import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react'
import autosize from 'autosize'
import { useField } from 'formik'
import { useRef, useEffect } from 'react'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { name: string, label: string }

export const TextareaField: React.FC<Props> = (props): JSX.Element => {
  const [field, { error }] = useField(props)
  const { label, placeholder } = props

  // https://github.com/chakra-ui/chakra-ui/issues/670
  const ref: any = useRef()
  useEffect(() => {
    const current = ref.current
    autosize(current)
    return () => {
      autosize.destroy(current)
    }
  }, [])

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Textarea
        {...field}
        {...props}
        ref={ref}
        id={field.name}
        placeholder={placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}