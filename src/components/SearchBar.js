import React from 'react'
import { Box, Heading } from 'rebass'
import { Input } from '@rebass/forms'

const SearchBar = () => {
  return (
    <Box mb={3}>
      <Heading mb={1} mx={'auto'} fontSize={2} color={'white'}>
        Search for your favorite movie
      </Heading>
      <Input
        sx={{ outline: 'none' }}
        id='search'
        name='search'
        type='text'
        placeholder='Harry Potter'
        bg={'white'}
      />
    </Box>
  )
}

export default SearchBar