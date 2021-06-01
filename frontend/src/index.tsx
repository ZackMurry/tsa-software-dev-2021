import { Box, ChakraProvider, Flex, Heading, Spinner } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
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
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const mainElement = document.createElement('div')
document.body.appendChild(mainElement)

const App: FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [isFileUploadOpen, setFileUploadOpen] = useState(false)
  const storage = useStorage()
  useEffect(() => {
    const setupStorage = async () => {
      if (await setup()) {
        storage.updateStorage(getStorage()!)
      }
      setLoading(false)
    }
    setupStorage()
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <storageContext.Provider value={storage}>
        {isLoading ? (
          <Flex justifyContent='center' alignItems='center' w='100%' h='100%'>
            <Spinner />
          </Flex>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <Flex p='4.5%' justifyContent='center' alignItems='center' flexDir='column'>
              <Heading mb='25px'>Secure File Transfer</Heading>
              <Flex justifyContent='center' flexDir={{ base: 'column', md: 'row' }}>
                <ContactsPanel isFullHeight={!isFileUploadOpen} />
                <Box ml={{ base: 0, md: '2.5%' }} mt={{ base: '2.5%', md: 0 }}>
                  <ContactInformation />
                  <FileUploadForm onSelectFile={() => setFileUploadOpen(true)} onRestart={() => setFileUploadOpen(false)} />
                </Box>
              </Flex>
            </Flex>
            <Footer />
          </DndProvider>
        )}
        <FileDownloadListener />
        <ServerLoader />
      </storageContext.Provider>
    </ChakraProvider>
  )
}

ReactDOM.render(<App />, mainElement)
