import React, { useState, useEffect } from 'react'
import { Input } from '@rebass/forms'
import { Flex, Text, Box, Heading } from 'rebass'
import KalaSearch from 'kalasearch-javascript-sdk'
import MovieCard from './MovieCard'

const KALA_API_KEY = '356c5f8d-c05d-4783-9917-a7e309d8a216'
const KALA_APP_ID = 'a7da6423-d048-4900-8ccc-4bd8bb91d0be'

const client = new KalaSearch({
  apiKey: KALA_API_KEY,
  appId:  KALA_APP_ID
})

const index = client.getIndex('a422cd23-b37e-4263-8992-766c1f2885ce')

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
                name={hasHighlightName ? movie.highlights.name.value : movie.source.name}
                cover={movie.source.image}
                actors={movie.source.actors}
                story={hasHighlightStory ? movie.highlights.story.value : movie.source.story}
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