import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/button'
import { ComponentWithAs } from '@chakra-ui/system'

const ApplicationButton: ComponentWithAs<'button', ButtonProps> = props => (
  <Button bg='highlight.400' color='white' {...props} _hover={{ bg: 'highlight.500' }} _active={{ bg: 'highlight.600' }} />
)

export default ApplicationButton
