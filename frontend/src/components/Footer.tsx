import { Flex, Text } from '@chakra-ui/layout'
import React, { FC } from 'react'

const Footer: FC = () => (
  <footer style={{ position: 'absolute', bottom: 25, left: 0, width: '100%' }}>
    <Flex w='100%' justifyContent='space-around'>
      <a>
        <Text textAlign='center'>Help</Text>
      </a>
    </Flex>
  </footer>
)

export default Footer
