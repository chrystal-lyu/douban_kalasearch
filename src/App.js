import React from 'react'
import { Box } from 'rebass'
import { ThemeProvider } from 'emotion-theming'
import { theme } from './styles/theme'
import Results from './components/Results'

const App = props => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{minHeight: '100vh'}}
        variant='styles.root'
        bg={'dark'}
      >
        <Box
         p={3}
         mx={'auto'}
         sx={{maxWidth: '1024px'}}
        >
          <Results/>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App;
