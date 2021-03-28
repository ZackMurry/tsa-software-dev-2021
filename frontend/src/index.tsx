import { ChakraProvider, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { spawn } from 'child_process'
import path from 'path'
import getStorage from './lib/getStorage'
import setup from './lib/setup'
import { storageContext } from './lib/storageContext'
import theme from './lib/theme'
import useStorage from './lib/useStorage'
import HomePage from './pages/HomePage'
import { getConfig } from './lib/getConfig'
import ServerLoader from './components/ServerLoader'
const { getCurrentWindow } = require('electron').remote

const mainElement = document.createElement('div')
document.body.appendChild(mainElement)

const App = () => {
  const storage = useStorage()
  const toast = useToast()
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
        <HashRouter>
          <Route exact path='/' render={() => <HomePage />} />
        </HashRouter>
        <ServerLoader />
      </storageContext.Provider>
    </ChakraProvider>
  )
}

ReactDom.render(<App />, mainElement)
