import React, { FC, useRef, useState } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { spawn } from 'child_process'
import { CheckIcon } from '@chakra-ui/icons'
import { Collapse } from '@chakra-ui/transition'
import path from 'path'
import FileSelector from './FileSelector'
import ApplicationInput from './ApplicationInput'
import ApplicationButton from './ApplicationButton'
import { getConfig } from '../lib/getConfig'
import { useToast } from '@chakra-ui/toast'
import { dataPath } from '../lib/setup'
import { Button } from '@chakra-ui/button'
import { useDrop } from 'react-dnd'
import { Contact } from '../lib/types'

const { getCurrentWindow } = require('electron').remote

interface Props {
  onSelectFile: () => void
  onRestart: () => void
}

const FileUploadForm: FC<Props> = ({ onSelectFile, onRestart }) => {
  const [filePath, setFilePath] = useState<string | null>(null)
  const [targetId, setTargetId] = useState('')
  const [targetContact, setTargetContact] = useState<Contact | null>(null)
  const [shareState, setShareState] = useState<'details' | 'starting' | 'uploading' | 'done'>('details')
  const dropRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  const onDrop = (contact: Contact) => {
    setTargetContact(contact)
  }

  const [, drop] = useDrop(() => ({
    accept: 'contact',
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: onDrop
  }))

  const handleShare = () => {
    setShareState('starting')
    const config = getConfig()
    if (typeof config === 'string') {
      toast({
        status: 'error',
        title: `Error loading configuration: ${config}`,
        description: `Please edit the configuration file (${path.join(dataPath, 'config.json')})`
      })
      return
    }
    if (!filePath) {
      return
    }
    const selectedTargetId = targetContact?.name ?? targetId
    const clientProcess = spawn('java', ['-jar', config.clientPath, selectedTargetId, filePath])
    clientProcess.stdout.on('data', data => {
      console.log(`client: ${data}`)
    })
    let errorHasOccurred = false
    clientProcess.stderr.on('data', data => {
      console.error(data.toString())
      if (errorHasOccurred) {
        return
      }
      errorHasOccurred = true
      setShareState('details')
      toast({
        status: 'error',
        title: 'An error occurred while uploading.',
        description: "Make sure that the person you're sharing with has their server running",
        isClosable: true
      })
    })
    clientProcess.on('exit', code => {
      if (code === 0) {
        setShareState('done')
      }
    })
    getCurrentWindow().on('close', () => {
      if (!clientProcess.killed) {
        clientProcess.kill('SIGINT')
      }
    })
    setShareState('uploading')
  }

  const handleRestart = () => {
    setFilePath(null)
    setTargetId('')
    setTargetContact(null)
    setTimeout(() => setShareState('details'), 1500)
    onRestart()
  }

  const handleSelectFile = (path: string) => {
    onSelectFile()
    setFilePath(path)
  }

  return (
    <Box mt='25px' bg='mono.200' borderRadius='15px'>
      <Heading fontSize='30px' pt='15px' pl='15px'>
        Share a file
      </Heading>
      <Flex
        p='15px'
        h='35vh'
        minH='200px'
        borderRadius='15px'
        bg='mono.200'
        ref={dropRef}
        justifyContent='center'
        alignItems='center'
      >
        <Flex
          justifyContent='center'
          alignItems='center'
          w='100%'
          h='95%'
          borderRadius='15px'
          borderColor='mono.300'
          borderStyle='dashed'
          borderWidth='1px'
        >
          {filePath ? (
            <Flex w='100%' h='85px' justifyContent='center' alignItems='center' flexDir='column'>
              <CheckIcon color='highlight.500' fontSize='36px' />
              <Text fontWeight='bold' textAlign='center' pt='5px'>
                File selected
              </Text>
              <Text textAlign='center' fontSize='14px'>
                {filePath}
              </Text>
            </Flex>
          ) : (
            <FileSelector dropRef={dropRef} onSelect={handleSelectFile} />
          )}
        </Flex>
      </Flex>
      <Collapse in={Boolean(filePath)}>
        <Box p='15px' pb='20px' pl='20px'>
          {shareState !== 'done' && (
            <Box ref={drop} role='Select contact'>
              <Text mb='5px'>Enter the ID or drag the contact of the person you want to share with</Text>
              <Flex alignItems='center'>
                {targetContact ? (
                  <Text mr='15px' fontWeight='bold'>
                    {targetContact.name}
                  </Text>
                ) : (
                  <ApplicationInput
                    type='text'
                    placeholder='ID'
                    w='40%'
                    mr='15px'
                    value={targetId}
                    onChange={e => setTargetId(e.target.value)}
                  />
                )}
                <ApplicationButton isLoading={shareState !== 'details'} onClick={handleShare}>
                  Share
                </ApplicationButton>
                <Button
                  onClick={handleRestart}
                  variant='outline'
                  color='white'
                  _hover={{ bg: 'rgba(0, 0, 0, 25%)' }}
                  ml='10px'
                >
                  Cancel
                </Button>
                {shareState === 'starting' && <Text ml='15px'>Starting upload...</Text>}
                {shareState === 'uploading' && <Text ml='15px'>Uploading file...</Text>}
              </Flex>
            </Box>
          )}
          {shareState === 'done' && (
            <Flex alignItems='center'>
              <Text mr='15px'>File successfully shared</Text>
              <ApplicationButton onClick={handleRestart}>Share another</ApplicationButton>
            </Flex>
          )}
        </Box>
      </Collapse>
    </Box>
  )
}

export default FileUploadForm
