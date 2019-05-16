import React from 'react'
import styled from 'styled-components'
import { getMarker } from './MarkerTypes'

// export const Marker = styled.div`
//   border-radius: 50%;
//   display: inline-block;
//   background-color: ${props => props.type === "from" ? '#37DD6A' : props.type === "to" ? '#E3435C' : '#FFFF67'};
//   width: 20px;
//   height: 20px;

//   &:hover {
//     cursor: pointer;
//   }
// `

export const ImageMarker = props => {
  return (
    <StyledImageMarker {...props} src={getMarker(props.type)}/>
  )
}

const StyledImageMarker = styled.img`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-left: -5px;
  margin-top: -30px;
  filter: drop-shadow(1px -1px 2px #444);

  &:hover {
    cursor: pointer;
  }
`