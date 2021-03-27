import { Button } from '@chakra-ui/button'
import { Box, Heading } from '@chakra-ui/layout'
import React from 'react'
import { FC } from 'react'
import ApplicationButton from '../components/ApplicationButton'
import ApplicationInput from '../components/ApplicationInput'
import ContactInformation from '../components/ContactInformation'
import FileSelector from '../components/FileSelector'

const HomePage: FC = () => {
  return (
    <Box p='7.5%'>
      <Heading mb='15px'>Home page</Heading>
      <ApplicationButton mr='15px'>Button</ApplicationButton>
      <ApplicationInput type='text' placeholder='Name' w='250px' mr='15px' />
      <Box mt='15px'>
        <ContactInformation name='Raghav Bansal' code='6453893131' />
      </Box>
      <Box mt='15px'>
        <FileSelector onUpload={console.log} />
      </Box>
    </Box>
  )
}

export default HomePage
