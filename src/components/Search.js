import React, { useState, useEffect } from 'react'
import { Input } from '@rebass/forms'
import { Flex, Text, Box, Heading } from 'rebass'
import KalaSearch from 'kalasearch-javascript-sdk'
import MovieCard from './MovieCard'

const KALA_APP_ID = '114a68ad-f8cb-485c-9ca3-e8f8692f597f'
const KALA_API_KEY = '44e763bc-0c61-4716-a5c7-0a77c3a96b47'

const client = new KalaSearch({
  appId:  KALA_APP_ID,
  apiKey: KALA_API_KEY
})

const index = client.getIndex('42303413-ac7d-4b71-abac-581e11c0d6d1')

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
        const options = {
          highlightFields: ["name","story"]
        }
        let response = await index.search(
          `${query}`,
          options
        )
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
              marginTop: [30, 30, 100],
              marginBottom: 50,
            }}
            mx={'auto'}
            color={'white'}
          >
            卡拉搜索
          </Heading>
          <Input
            sx={{
              outline: 'none',
              marginBottom: 20,
              maxWidth: 500
            }}
            id='search'
            name='search'
            type='text'
            placeholder='尝试搜索 无间道 或 大白鲨'
            bg={'white'}
            mx={'auto'}
            value={tempQuery}
            onChange={(e) => handleChange(e)}
            onCompositionStart={(e) => handleComposition(e)}
            onCompositionUpdate={(e) => handleComposition(e)}
            onCompositionEnd={(e) => handleComposition(e)}
          />
          <Text
            sx={{ marginBottom: 20 }}
            color={'white'}
          >
            {hits} 个搜索结果 ｜ 用时 {time} 毫秒 ⚡️
          </Text>
        </Box>
        <Box
          mx={'auto'}
          sx={{
            maxWidth: 500
          }}
        >
          {results.map((movie, index) => {
            const hasHighlightName = (movie.highlights !== undefined && movie.highlights.name) ? true : false
            const hasHighlightStory = (movie.highlights !== undefined && movie.highlights.story) ? true : false
            return (
              <MovieCard
                key={index}
                name={hasHighlightName ? movie.highlights.name.snippet : movie.source.name}
                cover={movie.source.image}
                actors={movie.source.actors}
                story={hasHighlightStory ? movie.highlights.story.snippet : movie.source.story}
                hasHighlightName={hasHighlightName}
                hasHighlightStory={hasHighlightStory}
              />
            )
          })}
        </Box>
      </Box>
    )
  }
}

export default Search