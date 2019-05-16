import React from 'react'
import styled from 'styled-components'
import { Input } from '../../components/UI/Input/Input';
import { Point } from '../../components/Point/Point';

export class Form extends React.PureComponent {
  renderPoints = () => {
    const { points } = this.props
    return points.map(p => <Point key={p.id} id={p.id}/>)
  }
  render() {
    const { minSightSeeingDist, onMinSightSeeingDistChange } = this.props
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
      </StyledForm>
    )
  }
}

const StyledForm = styled.form`
`