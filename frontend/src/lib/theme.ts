import { extendTheme, ThemeOverride } from '@chakra-ui/react'

const config: ThemeOverride = {}

config.colors = {
  'mono.100': '#1e1e1e',
  'mono.200': '#252526',
  'mono.300': '#2d2d30',
  'mono.400': '#3e3e42',
  'mono.500': '#5a5a61',
  'mono.600': '#717178',
  'mono.700': '#a2a2b0',
  'mono.900': '#dedeec',
  'highlight.400': '#007acc',
  'highlight.500': '#1d92e0',
  'highlight.600': '#1d99ed',
  'highlight.700': '#24a0f4',
  'highlight.800': '#1fa4fd'
}

config.styles = {
  global: {
    'html, body': {
      backgroundColor: config.colors['mono.100'].toString()
    }
  }
}

config.fonts = {
  heading:
    "Open Sans, Roboto, Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Cantarell, 'Helvetica Neue', sans-serif",
  body:
    "Open Sans, Roboto, Ubunt, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Cantarell, 'Helvetica Neue', sans-serif"
}

config.components = {
  Heading: {
    baseStyle: {
      // @ts-ignore
      color: 'white'
    }
  },
  Text: {
    baseStyle: {
      color: config.colors['mono.900'].toString()
    }
  }
}

const theme = extendTheme(config)

export default theme
