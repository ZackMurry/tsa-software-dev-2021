import React, { useContext } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { storageContext } from '../lib/storageContext'

const ContactInformation: FC = () => {
  const { storage } = useContext(storageContext)

  return (
    <Box bg='mono.200' borderRadius='10px' p='15px'>
      <Text>
        To receive files, tell people to use this code:
        <span style={{ fontWeight: 'bold' }}>{` ${storage.userId}`}</span>
      </Text>
    </Box>
  )
}

export default ContactInformation
