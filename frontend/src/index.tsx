import { ChakraProvider } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import getStorage from './lib/getStorage'
import setup from './lib/setup'
import { storageContext } from './lib/storageContext'
import theme from './lib/theme'
import { StorageData } from './lib/types'
import useStorage from './lib/useStorage'
import HomePage from './pages/HomePage'

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
        <HashRouter>
          <Route exact path='/' render={() => <HomePage />} />
        </HashRouter>
      </storageContext.Provider>
    </ChakraProvider>
  )
}

ReactDom.render(<App />, mainElement)
