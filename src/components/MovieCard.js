import React from 'react'
import { Box, Card, Image, Heading, Text } from 'rebass'

const MovieCard = (props) => {
  return (
    <Box px={2} py={2} width={1/4}>
      <Card
        bg={'white'}
        sx={{
          p: 1,
          borderRadius: 2,
          boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
        }}>
        <Image src={'https://miro.medium.com/max/804/0*HByUfRv6tRL2QoWg.png'} />
        <Box px={2}>
          <Heading fontSize={2}>
            {props.name}
          </Heading>
          <Text fontSize={0}>
            You can edit this code
          </Text>
        </Box>
      </Card>
    </Box>
  )
}

export default MovieCard