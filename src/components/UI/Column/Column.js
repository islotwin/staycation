import styled from 'styled-components'

export const Column = styled.div`
  height: 100%;
  width: ${props => props.width ? props.width : '100%'};
  min-width: ${props => props.minwidth ? props.minwidth : 'auto'};
  box-shadow: ${props => props.shadow ? 'inset 0px 0px 0.6rem #ddd' : 'none'};
`