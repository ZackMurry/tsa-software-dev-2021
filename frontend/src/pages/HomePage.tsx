import { Box, Heading, Text } from '@chakra-ui/layout'
import React, { useContext } from 'react'
import { FC } from 'react'
import ApplicationButton from '../components/ApplicationButton'
import ApplicationInput from '../components/ApplicationInput'
import ContactInformation from '../components/ContactInformation'
import FileUploadForm from '../components/FileUploadForm'
import FileDownloadListener from '../components/FileDownloadListener'
import { storageContext } from '../lib/storageContext'

const HomePage: FC = () => {
  const { storage } = useContext(storageContext)
  return (
    <Box p='7.5%'>
      <Heading mb='15px'>Home page</Heading>
      <ApplicationButton mr='15px'>Button</ApplicationButton>
      <ApplicationInput type='text' placeholder='Name' w='250px' mr='15px' />
      <Box mt='15px'>
        <ContactInformation name='Raghav Bansal' code='6453893131' />
      </Box>
      <FileUploadForm />
      <FileDownloadListener />
      <Text>Your ID is {storage?.userId}</Text>
    </Box>
  )
}

export default HomePage
