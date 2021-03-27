import React, { FC, useEffect, useRef, useState } from 'react'
import { Box, Flex, Input, Text } from '@chakra-ui/react'
const { dialog } = window.require('electron').remote
import ApplicationButton from './ApplicationButton'

interface Props {
  onUpload: (path: string) => void
}

const FileSelector: FC<Props> = ({ onUpload }) => {
  const dropRef = useRef<HTMLDivElement>(null)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    if (!e.dataTransfer) {
      return
    }
    const { files } = e.dataTransfer
    if (files && files.length) {
      onUpload(files[0].path)
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    dropRef.current?.addEventListener('dragover', handleDragOver)
    dropRef.current?.addEventListener('drop', handleDrop)
    return () => {
      dropRef.current?.removeEventListener('dragover', handleDragOver)
      dropRef.current?.removeEventListener('drop', handleDrop)
    }
  }, [])

  const handleFileSelectClick = () => {
    const files = dialog.showOpenDialogSync({ properties: ['openFile'] })
    if (files && files.length) {
      onUpload(files[0])
    }
  }

  return (
    <Flex p='15px' borderRadius='15px' bg='mono.200' ref={dropRef} justifyContent='center' alignItems='center'>
      <Box pt='40px' pb='40px' w='100%' borderRadius='15px' borderColor='mono.300' borderStyle='dashed' borderWidth='1px'>
        <Text fontWeight='bold' textAlign='center'>
          Drop a file
        </Text>
        <Text textAlign='center'>or</Text>
        <Flex justifyContent='center' mt='5px'>
          <ApplicationButton size='sm' onClick={handleFileSelectClick}>
            Select a file
          </ApplicationButton>
        </Flex>
      </Box>
    </Flex>
  )
}

export default FileSelector
