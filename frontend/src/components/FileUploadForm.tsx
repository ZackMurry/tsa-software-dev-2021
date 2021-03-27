import React, { FC, useRef, useState } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { spawn } from 'child_process'
import { CheckIcon } from '@chakra-ui/icons'
import { Collapse } from '@chakra-ui/transition'
import FileSelector from './FileSelector'
import ApplicationInput from './ApplicationInput'
import ApplicationButton from './ApplicationButton'

const FileUploadForm: FC = () => {
  const [filePath, setFilePath] = useState<string | null>(null)
  const [targetId, setTargetId] = useState('')
  const [shareState, setShareState] = useState<'details' | 'starting' | 'uploading' | 'done'>('details')
  const dropRef = useRef<HTMLDivElement>(null)

  const handleShare = () => {
    setShareState('starting')
    // todo this is hard-coded
    const child = spawn('java', ['-jar', '/home/zack/tsa-software-dev-2021/backend/target/backend-1.0-SNAPSHOT.jar'])
    child.stdout.on('data', data => {
      console.log(`child: ${data}`)
    })
    child.stderr.on('data', data => {
      console.error(`child: ${data}`)
    })
    child.on('exit', code => {
      if (code === 0) {
        setShareState('done')
      }
    })
    setShareState('uploading')
  }

  const handleRestart = () => {
    setFilePath(null)
    setTargetId('')
    setTimeout(() => setShareState('details'), 1500)
  }

  return (
    <Box mt='15px' bg='mono.200' borderRadius='15px'>
      <Heading fontSize='30px' pt='15px' pl='15px'>
        Share a file
      </Heading>
      <Flex p='15px' borderRadius='15px' bg='mono.200' ref={dropRef} justifyContent='center' alignItems='center'>
        <Box pt='40px' pb='40px' w='100%' borderRadius='15px' borderColor='mono.300' borderStyle='dashed' borderWidth='1px'>
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
            <FileSelector dropRef={dropRef} onSelect={setFilePath} />
          )}
        </Box>
      </Flex>
      <Collapse in={Boolean(filePath)}>
        <Box p='15px' pb='20px' pl='20px'>
          {shareState !== 'done' && (
            <>
              <Text mb='5px'>Enter the ID of the person you want to share with</Text>
              <Flex alignItems='center'>
                <ApplicationInput
                  type='text'
                  placeholder='ID'
                  w='40%'
                  mr='15px'
                  value={targetId}
                  onChange={e => setTargetId(e.target.value)}
                />
                <ApplicationButton isLoading={shareState !== 'details'} onClick={handleShare}>
                  Share
                </ApplicationButton>
                {shareState === 'starting' && <Text ml='15px'>Starting upload...</Text>}
                {shareState === 'uploading' && <Text ml='15px'>Uploading file...</Text>}
              </Flex>
            </>
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
