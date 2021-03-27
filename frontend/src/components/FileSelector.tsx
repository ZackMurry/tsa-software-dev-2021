import React, { FC, RefObject, useEffect } from 'react'
import { Flex, Text } from '@chakra-ui/react'
const { dialog } = window.require('electron').remote
import ApplicationButton from './ApplicationButton'

interface Props {
  onSelect: (path: string) => void
  dropRef: RefObject<HTMLDivElement>
}

const FileSelector: FC<Props> = ({ onSelect, dropRef }) => {
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    if (!e.dataTransfer) {
      return
    }
    const { files } = e.dataTransfer
    if (files && files.length) {
      onSelect(files[0].path)
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
      onSelect(files[0])
    }
  }

  return (
    <>
      <Text fontWeight='bold' textAlign='center'>
        Drop a file
      </Text>
      <Text textAlign='center'>or</Text>
      <Flex justifyContent='center' mt='5px'>
        <ApplicationButton size='sm' onClick={handleFileSelectClick}>
          Select a file
        </ApplicationButton>
      </Flex>
    </>
  )
}

export default FileSelector
