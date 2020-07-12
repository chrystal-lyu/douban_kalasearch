import preset from '@rebass/preset'

export const theme = {
  ...preset,
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [
    12, 14, 16, 24, 32, 48, 64
  ],
  space: [ 0, 6, 12, 24, 48 ],
  colors: {
    primary: '#ea4c89',
    gray: '#f6f6ff',
    dark: '#171F23',
    white: '#FFFFFF',
    red: '#ff5c5c',
    secondary: '#999999'
  },
  buttons: {
    primary: {
      color: 'white',
      bg: 'primary',
    },
    outline: {
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 2px'
    },
  },
}