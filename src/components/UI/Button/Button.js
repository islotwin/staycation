import styled from 'styled-components'

export const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  box-sizing: border-box;
  /* background-color: #ccc; */
  border: 2px solid #eee;
  color: #444;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  width: ${props => props.width ? props.width : '100px'};

  &:hover {
    /* background-color: #eee; */
    border-color: #ccc;
  }

  &.Danger {
    /* background-color: #E3435C; */
    border-color: #E3435C;

    &:hover {
      /* background-color: #B41730; */
      border-color: #B41730;
    }
  }

  &.Success {
    /* background-color: #2BA5FF; */
    border-color: #2BA5FF;

    &:hover {
      /* background-color: #026BB9; */
      border-color: #026BB9;
    }
  }
`