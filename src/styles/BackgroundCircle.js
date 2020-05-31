import React from 'react'
import { Box } from 'rebass'
import Styled from 'styled-components'

const Circle = Styled.div`
  height: 25px;
  width: 25px;
  background-image: linear-gradient(${props => props.colorTop}, ${props => props.colorBottom});
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: ${props => props.positionY}vh;
  left: ${props => props.positionX}vw;
`

const ArcTop = Styled.div`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: 50%;
  position: absolute;
  border: 2px ${props => props.type} #343C40;
  top: -${props => props.size/2}px;
  left: -${props => props.size/2}px;
`

const ArcBottom = Styled.div`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: 50%;
  position: absolute;
  border: 2px ${props => props.type} #343C40;
  bottom: -${props => props.size/2}px;
  right: -${props => props.size/2}px;
`

const BackgroundCircle = () => {
  return (
    <Box>
      <ArcTop size={300} type={'solid'}/>
      <ArcTop size={450} type={'dashed'}/>
      <ArcTop size={600} type={'solid'}/>
      <ArcBottom size={300} type={'solid'}/>
      <ArcBottom size={450} type={'dashed'}/>
      <ArcBottom size={600} type={'solid'}/>
      <Circle colorTop={'#E83B45'} colorBottom={'#863AE3'} positionX={80} positionY={10}/>
      <Circle colorTop={'#6F3AFF'} colorBottom={'#743AFF'} positionX={35} positionY={11}/>
      <Circle colorTop={'#FA8D26'} colorBottom={'#CE4A2C'} positionX={55} positionY={20}/>
      <Circle colorTop={'#E83B45'} colorBottom={'#863AE3'} positionX={10} positionY={65}/>
      <Circle colorTop={'#3BF1EA'} colorBottom={'#3A95FC'} positionX={25} positionY={75}/>
      <Circle colorTop={'#E83B45'} colorBottom={'#863AE3'} positionX={65} positionY={80}/>
      <Circle colorTop={'#FA8D26'} colorBottom={'#CE4A2C'} positionX={75} positionY={60}/>
    </Box>
  )
}

export default BackgroundCircle