import React, { useState, useEffect } from 'react'
import { Input } from '@rebass/forms'
import { Flex, Text, Box, Heading } from 'rebass'
import KalaSearch from 'kalasearch-javascript-sdk'
import MovieCard from './MovieCard'

const KALA_API_KEY = '19f9453a-8b9d-4af3-8021-d40fcd0f0dc2'
const KALA_APP_ID = '3bc797e5-9538-4374-a82c-36a4cd9c0071'

const client = new KalaSearch({
  apiKey: KALA_API_KEY,
  appId:  KALA_APP_ID
})

const index = client.getIndex('bc4099ed-32bd-4262-9333-1b05398913fd')

let onComposition = false

const Search = () => {
  const [errors, setErrors] = useState(false)
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('')
  const [tempQuery, setTempQuery] = useState('')
  const [hits, setHits] = useState([])
  const [time, setTime] = useState([])

  useEffect(() => {
    async function f() {
      try {
        let response = await index.search(`${query}`)
        setResults(response.hits)
        setTime(response.queryTimeUsed)
        setHits(response.totalHits)
      } catch(err) {
        setErrors(err.response)
      }
    }
    f()
  }, [query])

  const handleComposition = (e) => {
    if (e.type === 'compositionend') {
      onComposition = false
      setQuery(e.target.value)
    } else {
      onComposition = true
      setTempQuery(tempQuery)
    }
  }

  const handleChange = (e) => {
    if (!onComposition) setQuery(e.target.value) 
    setTempQuery(e.target.value)
  }

  if (errors) {
    return (
      <Flex sx={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'}}
      >
        <Box color={'white'} >
          {errors.status} {errors.body.message}
        </Box>
      </Flex>
    )
  } else {
    return (
      <Box>
        <Box sx={{ textAlign: 'center' }} >
          <Heading
            sx={{
              marginTop: 200,
              marginBottom: 50,
            }}
            mx={'auto'}
            color={'white'}
          >
            You Search. We Deliver.
          </Heading>
          <Input
            sx={{
              outline: 'none',
              marginBottom: 50,
              maxWidth: 500
            }}
            id='search'
            name='search'
            type='text'
            placeholder='Harry Potter'
            bg={'white'}
            mx={'auto'}
            value={tempQuery}
            onChange={(e) => handleChange(e)}
            onCompositionStart={(e) => handleComposition(e)}
            onCompositionUpdate={(e) => handleComposition(e)}
            onCompositionEnd={(e) => handleComposition(e)}
          />
          <Text
            sx={{ marginBottom: 50 }}
            color={'white'}
          >
            {hits} hits in {time}ms
          </Text>
        </Box>
        <Flex flexWrap='wrap' mx={-2}>
          {results.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                name={movie._source.NAME}
                cover={movie._source.COVER}
                actors={movie._source.ACTORS}
              />
            )
          })}
        </Flex>
      </Box>
      
    )
  }
}

export default Search