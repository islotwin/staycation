import React from 'react'
import styled from 'styled-components'
import { Input } from '../../components/UI/Input/Input';
import { Point } from '../../components/Point/Point';
import Switch from 'react-switch'

export class Form extends React.PureComponent {
  renderPoints = () => {
    const { points } = this.props
    return points.map(p => <Point key={p.id} id={p.id}/>)
  }
  render() {
    const { minSightSeeingDist, onMinSightSeeingDistChange, shortestPathMode, setSearchMode } = this.props
    return (
      <StyledForm>
        {this.renderPoints()}
        <Input
          className="row"
          name="sightseeing" 
          label="Minimum sightseeing distance" 
          type="number" 
          placeholder="Sightseeing distance"
          value={minSightSeeingDist}
          onChange={onMinSightSeeingDistChange}
        />
        <SwitchContainer className="row">
          <Switch 
            checkedIcon={false} 
            uncheckedIcon={false}
            onColor="#2BA5FF"
            offColor="#026BB9"
            checked={shortestPathMode} 
            onChange={setSearchMode}
            handleDiameter={24}
          />
          <Label>{shortestPathMode ? "Shortest Path" : "Fastest Path"}</Label>
        </SwitchContainer>
      </StyledForm>
    )
  }
}

const StyledForm = styled.form`
`

const SwitchContainer = styled.div`
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
`