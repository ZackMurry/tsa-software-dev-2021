import { Flex, Text } from '@chakra-ui/layout'
import React, { FC } from 'react'

const Footer: FC = () => {
  const handleHelpClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    require('electron').shell.openExternal('https://github.com/ZackMurry/tsa-software-dev-2021')
  }

  return (
    <footer style={{ position: 'absolute', bottom: 25, left: 0, width: '100%' }}>
      <Flex w='100%' justifyContent='space-around'>
        <a style={{ color: 'white' }} onClick={handleHelpClick} href='https://github.com/ZackMurry/tsa-software-dev-2021'>
          <Text>Help</Text>
        </a>
      </Flex>
    </footer>
  )
}

export default Footer
