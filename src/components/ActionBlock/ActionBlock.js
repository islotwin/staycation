import React from 'react'
import styled from 'styled-components'
import { Button } from '../UI/Button/Button';

export const ActionBlock = props => {
  return (
    <StyledActionBlock>
      {props.actions.map(a => <Button key={a.text} {...a}>{a.text}</Button>)}
    </StyledActionBlock>
  )
}

const StyledActionBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
`