import { ChakraProvider } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { spawn } from 'child_process'
import getStorage from './lib/getStorage'
import setup from './lib/setup'
import { storageContext } from './lib/storageContext'
import theme from './lib/theme'
import useStorage from './lib/useStorage'
import HomePage from './pages/HomePage'
const { getCurrentWindow } = require('electron').remote

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
    if (!storage.storage?.userId) {
      return
    }
    const serverProcess = spawn('java', [
      '-jar',
      // todo allow config of this path
      '/home/zack/tsa-software-dev-2021/backend/server/target/backend-server-1.0-SNAPSHOT.jar',
      storage.storage.userId
    ])
    console.log('server started')
    serverProcess.stderr.on('data', chunk => console.error(`server: ${chunk}`))
    serverProcess.stdout.on('data', chunk => console.log(`server: ${chunk}`))
    serverProcess.on('close', () => console.log('closed server'))
    const killServer = () => {
      serverProcess.kill('SIGINT')
      console.log('killed server')
    }
    getCurrentWindow().on('close', killServer)
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
