import { Box, Heading, Text } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { FC } from 'react'
import ApplicationButton from '../components/ApplicationButton'
import ApplicationInput from '../components/ApplicationInput'
import ContactInformation from '../components/ContactInformation'
import FileSelector from '../components/FileSelector'
import useStorage from '../lib/useStorage'

const HomePage: FC = () => {
  const { storage, updateStorage } = useStorage()

  const handleButtonClick = () => {
    updateStorage({ userId: 'test' })
  }
  return (
    <Box p='7.5%'>
      <Heading mb='15px'>Home page</Heading>
      <ApplicationButton mr='15px' onClick={handleButtonClick}>
        Button
      </ApplicationButton>
      <ApplicationInput type='text' placeholder='Name' w='250px' mr='15px' />
      <Box mt='15px'>
        <ContactInformation name='Raghav Bansal' code='6453893131' />
      </Box>
      <Box mt='15px'>
        <FileSelector onUpload={console.log} />
      </Box>
      <Text>{JSON.stringify(storage)}</Text>
    </Box>
  )
}

export default HomePage
