import React, { useState, useEffect } from 'react'
import { Input } from '@rebass/forms'
import { Flex, Text, Box, Heading } from 'rebass'
import KalaSearch from 'kalasearch-javascript-sdk'
import MovieCard from './MovieCard'

const KALA_API_KEY = '5d47ad94-0cd8-4d15-b4a1-283e932e6d1e'
const KALA_APP_ID = '30bd6466-b03b-4289-baa8-cd745c5b9c33'

const client = new KalaSearch({
  apiKey: KALA_API_KEY,
  appId:  KALA_APP_ID
})

const index = client.getIndex('5a84eb90-ec74-47d2-acb6-8fb6f6fc0878')

const Search = () => {
  const [errors, setErrors] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [time, setTime] = useState([]);

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
  }, [query]);
  
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
            value={query}
            onChange={
              event => setQuery(event.target.value)
            }
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