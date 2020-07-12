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
          flexDirection: 'row',
          height: 132
        }}>
        <Image
          sx={{
            height: 120,
            width: '20%',
            objectFit: 'cover'
          }}
          src={props.cover}
          onError={handleImgError}
        />
        <Box
          px={2}
          sx={{width: '80%'}}
        >
          {
            props.hasHighlightName
            ? <Text
                fontSize={2} 
                dangerouslySetInnerHTML={{__html: props.name}}
                sx={{
                  fontWeight: 'bold',
                  'strong': {
                    color: 'red'
                  }
                }}
              ></Text>
            : <Text fontSize={2} sx={{fontWeight: 'bold'}}>{props.name}</Text>
          }

          {
            props.hasHighlightStory
            ? <Text 
                fontSize={1}
                my={1}
                dangerouslySetInnerHTML={{__html: props.story}}
                sx={{
                  color: 'secondary',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: '4',
                  WebkitBoxOrient: 'vertical',
                  'strong': {
                    color: 'red'
                  }
                }}
              ></Text>
            : <Text
                fontSize={1}
                my={1}
                sx={{
                  color: 'secondary',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: '4',
                  WebkitBoxOrient: 'vertical'
                }}
              >{props.story}</Text>
          }

        </Box>
      </Card>
    </Box>
  )
}

export default MovieCard