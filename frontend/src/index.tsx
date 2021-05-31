import { Box, ChakraProvider, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import getStorage from './lib/getStorage'
import setup from './lib/setup'
import { storageContext } from './lib/storageContext'
import theme from './lib/theme'
import useStorage from './lib/useStorage'
import ServerLoader from './components/ServerLoader'
import ContactInformation from './components/ContactInformation'
import FileUploadForm from './components/FileUploadForm'
import FileDownloadListener from './components/FileDownloadListener'
import Footer from './components/Footer'
import ContactsPanel from './components/ContactsPanel'

const mainElement = document.createElement('div')
document.body.appendChild(mainElement)

const App = () => {
  const storage = useStorage()
  useEffect(() => {
    const setupStorage = async () => {
      if (await setup()) {
        storage.updateStorage(getStorage()!)
      }
    }
    setupStorage()
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <storageContext.Provider value={storage}>
        <Box p='7.5%'>
          <Heading mb='15px'>Secure File Transfer</Heading>
          <Flex justifyContent='center' flexDir={{ base: 'column', md: 'row' }}>
            <ContactsPanel />
            <Box ml={{ base: 0, md: '2.5%' }} mt={{ base: '2.5%', md: 0 }}>
              <ContactInformation />
              <FileUploadForm />
            </Box>
          </Flex>
          <Footer />
        </Box>
        <FileDownloadListener />
        <ServerLoader />
      </storageContext.Provider>
    </ChakraProvider>
  )
}

ReactDom.render(<App />, mainElement)
