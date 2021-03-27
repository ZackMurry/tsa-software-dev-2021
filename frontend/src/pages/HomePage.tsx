import { Box, Heading } from '@chakra-ui/layout'
import React, { useContext } from 'react'
import { FC } from 'react'
import { spawn } from 'child_process'
import ApplicationButton from '../components/ApplicationButton'
import ApplicationInput from '../components/ApplicationInput'
import ContactInformation from '../components/ContactInformation'
import { storageContext } from '../lib/storageContext'
import FileUploadForm from '../components/FileUploadForm'
import FileDownloadListener from '../components/FileDownloadListener'

const HomePage: FC = () => {
  const { storage, updateStorage } = useContext(storageContext)

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
    </Box>
  )
}

export default HomePage
