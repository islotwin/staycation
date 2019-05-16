import { default as from } from '../../assets/from.svg'
import to from '../../assets/to.svg'
import marker from '../../assets/marker.svg'

const MarkerTypes = {
  from,
  to,
  marker
}

export const getMarker = type => MarkerTypes[type]