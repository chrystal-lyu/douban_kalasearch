import React, { useState, useEffect } from 'react'
import { Input } from '@rebass/forms'
import { Flex, Text, Box } from 'rebass'
import { KalaSearch } from 'kalasearch-javascript-sdk'
import MovieCard from './MovieCard'

const client = new KalaSearch({
  apiKey: '5d47ad94-0cd8-4d15-b4a1-283e932e6d1e',
  appId: '30bd6466-b03b-4289-baa8-cd745c5b9c33'
})

const indexId = '5a84eb90-ec74-47d2-acb6-8fb6f6fc0878'

const Search = () => {
  const [errors, setErrors] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function f() {
      try {
        let response = await client.search(`${query}`, indexId)
        setResults(response.hits);
      } catch(err) {
        setErrors(err.response)
      }
    }
    f()
  }, [query]);
  if (errors || !results) {
    return (
      <Flex>
        <Text color={'white'}>Oops, something went wrong.</Text>
      </Flex>
    )
  } else {
    return (
      <Flex flexWrap='wrap' mx={-2}>
        <Input
          sx={{ outline: 'none' }}
          id='search'
          name='search'
          type='text'
          placeholder='Harry Potter'
          bg={'white'}
          mx={2}
          mb={3}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
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
    )
  }
}

export default Search