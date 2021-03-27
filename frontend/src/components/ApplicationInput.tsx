import React from 'react'
import { Input, InputProps } from '@chakra-ui/input'
import { ComponentWithAs } from '@chakra-ui/system'

const ApplicationInput: ComponentWithAs<'input', InputProps> = props => (
  <Input
    color='white'
    borderColor='highlight.400'
    _hover={{ borderColor: 'highlight.500' }}
    _selected={{ borderColor: 'highlight.600' }}
    {...props}
  />
)

export default ApplicationInput
