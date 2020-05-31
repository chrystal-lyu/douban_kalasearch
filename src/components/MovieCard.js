import React from 'react'
import { Box, Card, Image, Heading, Text } from 'rebass'

const MovieCard = (props) => {
  const handleImgError = (e) => {
    e.target.src = "https://img3.doubanio.com/f/movie/30c6263b6db26d055cbbe73fe653e29014142ea3/pics/movie/movie_default_large.png"
  }
  return (
    <Box px={2} py={2} width={1/4}>
      <Card
        bg={'white'}
        sx={{
          p: 1,
          borderRadius: 2,
          boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
        }}>
        <Image
          src={props.cover}
          onError={handleImgError}
        />
        <Box px={1}>
          <Heading fontSize={2}>{props.name}</Heading>
          <Text fontSize={0} my={1}>{props.actors}</Text>
        </Box>
      </Card>
    </Box>
  )
}

export default MovieCard