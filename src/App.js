import React from 'react'
import { Box } from 'rebass'
import { ThemeProvider } from 'emotion-theming'
import { theme } from './styles/theme'
import Search from './components/Search'
import BackgroundCircle from './components/BackgroundCircle'

const App = props => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        variant='styles.root'
        bg={'dark'}
      >
        <Box
         p={3}
         mx={'auto'}
         sx={{
           minHeight: '100vh',
           maxWidth: '1024px',
           zIndex: 999,
           position: 'relative'
          }}
        >
          <Search/>
        </Box>
        <Box sx={{
          position: 'fixed',
          top: 0,
          height: '100%',
          width: '100%'}}>
            <BackgroundCircle/>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
