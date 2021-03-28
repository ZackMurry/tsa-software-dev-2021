import { useToast } from '@chakra-ui/toast'
import React, { FC, useContext, useEffect } from 'react'
import { spawn } from 'child_process'
import { getConfig } from '../lib/getConfig'
import { storageContext } from '../lib/storageContext'

const { getCurrentWindow } = require('electron').remote

const ServerLoader: FC = () => {
  const toast = useToast()
  const { storage } = useContext(storageContext)

  useEffect(() => {
    if (!storage?.userId) {
      return
    }
    const config = getConfig()
    if (typeof config === 'string') {
      toast({
        status: 'error',
        title: 'Error loading configuration',
        description: config,
        position: 'bottom',
        isClosable: true
      })
      return
    }
    const serverProcess = spawn('java', ['-jar', config.serverPath, storage.userId])
    console.log('server started')
    serverProcess.stderr.on('data', chunk => {
      console.error(chunk.toString())
      toast({
        status: 'error',
        title: 'Error occurred in server',
        description: chunk.toString()
      })
    })
    serverProcess.stdout.on('data', chunk => console.log(`server: ${chunk}`))
    serverProcess.on('close', () => console.log('closed server'))
    const killServer = () => {
      serverProcess.kill('SIGINT')
      console.log('killed server')
    }
    getCurrentWindow().on('close', killServer)
  }, [])
  return <div />
}

export default ServerLoader
