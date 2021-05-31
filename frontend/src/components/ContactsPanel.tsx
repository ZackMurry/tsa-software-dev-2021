import { Box, Heading } from '@chakra-ui/layout'
import React, { FC } from 'react'

const ContactsPanel: FC = () => {
  return (
    <Box bg='mono.200' borderRadius='15px' w={{ base: '100%', md: '25%' }}>
      <Heading fontSize='24px' p='15px'>
        Contacts
      </Heading>
    </Box>
  )
}

export default ContactsPanel
