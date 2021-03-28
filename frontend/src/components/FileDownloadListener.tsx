import React, { FC, useEffect } from 'react'
import chokidar from 'chokidar'
import os from 'os'
import path from 'path'
import { useToast } from '@chakra-ui/toast'

const FileDownloadListener: FC = () => {
  const toast = useToast()

  const handleNewFile = (path: string) => {
    toast({
      title: 'New file!',
      description: `You just received a new file (${path})`,
      position: 'bottom',
      isClosable: true,
      status: 'success'
    })
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
