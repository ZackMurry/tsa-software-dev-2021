import React, { FC, useEffect } from 'react'
import chokidar from 'chokidar'
import os from 'os'
import path from 'path'
import { useToast } from '@chakra-ui/toast'

const { Notification } = require('electron').remote

const FileDownloadListener: FC = () => {
  const handleNewFile = (path: string) => {
    new Notification({
      title: 'New file from Secure File Transfer',
      body: `You just received a new file (${path})`
    }).show()
  }

  useEffect(() => {
    const watcher = chokidar.watch(path.join(os.homedir(), 'tsa-drz-files'), {
      persistent: true,
      ignored: /[\/\\]\./
    })
    let isReady = false
    watcher
      .on('ready', () => {
        isReady = true
      })
      .on('add', path => {
        if (isReady) {
          handleNewFile(path)
        }
      })
      .on('error', console.error)
    return () => {
      watcher.close()
    }
  }, [])
  return <div />
}

export default FileDownloadListener
