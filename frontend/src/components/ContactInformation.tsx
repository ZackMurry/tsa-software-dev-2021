import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { FC } from 'react'

interface Props {
  name: string
  code: string
}

const ContactInformation: FC<Props> = ({ name, code }) => (
  <Box bg='mono.200' borderRadius='10px' p='15px'>
    <Text fontWeight='bold'>
      {name} <span style={{ fontWeight: 'lighter' }}>({code})</span>
    </Text>
  </Box>
)

export default ContactInformation
