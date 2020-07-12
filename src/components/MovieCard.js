import React from 'react'
import { Box, Card, Image, Text } from 'rebass'

const MovieCard = (props) => {
  const handleImgError = (e) => {
    e.target.src = "https://img3.doubanio.com/f/movie/30c6263b6db26d055cbbe73fe653e29014142ea3/pics/movie/movie_default_large.png"
  }
  return (
    <Box my={3}>
      <Card
        bg={'white'}
        sx={{
          p: 1,
          borderRadius: 2,
          boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
          display: 'flex',
          flexDirection: 'row'
        }}>
        <Image
          sx={{
            height: 130,
            width: '20%',
            objectFit: 'cover'
          }}
          src={props.cover}
          onError={handleImgError}
        />
        <Box mx={1} px={1} sx={{width: '80%'}}>
          {
            props.hasHighlights
            ? <Text 
                fontSize={2} 
                dangerouslySetInnerHTML={{__html: props.name}}
                sx={{
                  'strong': {
                    color: 'red'
                  }
                }}
              ></Text>
            : <Text fontSize={2}>{props.name}</Text>
          }
          <Text
            fontSize={0}
            my={1}
          >
            {props.actors}
          </Text>
        </Box>
      </Card>
    </Box>
  )
}

export default MovieCard