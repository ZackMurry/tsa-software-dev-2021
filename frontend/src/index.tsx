import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import theme from './lib/theme'
import HomePage from './pages/HomePage'

const mainElement = document.createElement('div')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Route exact path='/' render={() => <HomePage />} />
      </HashRouter>
    </ChakraProvider>
  )
}

ReactDom.render(<App />, mainElement)
