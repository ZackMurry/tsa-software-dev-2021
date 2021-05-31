import React, { useContext } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { storageContext } from '../lib/storageContext'

const ContactInformation: FC = () => {
  const { storage } = useContext(storageContext)

  return (
    <Box bg='mono.200' borderRadius='10px' p='15px' mt={{ base: '5px', md: 0 }}>
      <Text>
        To receive files, tell people to use this code:
        <span style={{ fontWeight: 'bold' }}>{` ${storage?.userId ?? 'Loading...'}`}</span>
      </Text>
    </Box>
  )
}

export default ContactInformation
