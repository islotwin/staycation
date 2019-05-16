import React from 'react'
import styled from 'styled-components'

export const Input = props => {
  const { label, className } = props
  return (
    <StyledInput className={className}>
      <InputElement {...props} />
      <Label>{label}</Label>
    </StyledInput>
  )
}

const StyledInput = styled.div`
  box-sizing: border-box;
  margin-bottom: 8px;

  &.row {
    padding: 10px;
  }
`

const Label = styled.label`
  font-size: 9px;
  font-weight: 500;
  display: block;
  margin-bottom: 2px;
  color: #222;
  text-transform: uppercase;
  /* padding: 0 10px; */
`

const InputElement = styled.input`
  border-style: none;
  outline: none;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  background-color: white;
  font: inherit;
  padding: 6px 0;
  width: 100%;
  margin-bottom: 3px;
  color: #222;

  &:hover {
    border-bottom: 1px solid #ccc;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #ccc;
  }

  &.From {
    border-bottom: 1px solid #37E077;
    &:hover {
    border-bottom: 1px solid #ccc;
    }
    &:focus {
      outline: none;
      border-bottom: 1px solid #ccc;
    }
  }

  &.To {
    border-bottom: 1px solid #FF6565;
    &:hover {
    border-bottom: 1px solid #ccc;
    }
    &:focus {
      outline: none;
      border-bottom: 1px solid #ccc;
    }
  }
`