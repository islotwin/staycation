import React from 'react'
import styled from 'styled-components'
import { Input } from '../UI/Input/Input';
import { PointContext } from '../../context/point-context';
import { capitalize } from '../../utils/capitalize'

export const Point = props => {
  const { id } = props
  return (
    <PointContext.Consumer>
      {context => {
        const { points, updatePoint } = context
        const point = points.find(p => p.id === id)
        const { name, lng, lat } = point
        const style = capitalize(id)
        return (
          <StyledPoint>
            <Name className={style}>{name}</Name>
            <Input
              step="0.000001"
              name="lng" 
              label="Longitude" 
              type="number" 
              placeholder="Long" 
              value={'' + lng}
              // onBlur={event => updatePoint({ id, name, lat, lng: (+event.target.value).toFixed(6) })}
              onChange={event => {
                const [,decimal = ''] = ('' + event.target.value).match(/(?:.*)\.(.*)/) || []
                
                if (decimal.length > 6) {
                  return;
                }
                updatePoint({ id, name, lat, lng: +event.target.value })
              }}
            />
            <Input 
              step="0.000001"
              name="lat" 
              label="Latitude" 
              type="number" 
              placeholder="Lat" 
              value={lat} 
              onChange={event => updatePoint({ id, name, lat: event.target.value, lng })}
            />
          </StyledPoint>
        )
      }
      }
    </PointContext.Consumer>
  )
}

const Name = styled.p`
  font-weight: 900;
  margin-top: 0;
  margin-bottom: 7px;
  text-transform: uppercase;
  font-size: 16px;
  &.From {
    color: #37E077;
  }
  &.To {
    color: #FF6565;
  }
`

const StyledPoint = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
`