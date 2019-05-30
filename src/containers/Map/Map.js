import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { ImageMarker } from '../../components/Marker/Marker';
import { PointContext } from '../../context/point-context';
import { getRoads } from '../../services/StaycationService/StaycationService';
import randomColor from 'randomcolor'

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export const Map = (props) => {
  const { path } = props
  const [draggable, setDraggable] = useState(true)
  const [draggedPoint, setDraggedPoint] = useState({})
  const [activePath, setActivePath] = useState({})
  const [google, setGoogle] = useState({})
  const createPath = pathCreator(google)
  const drawPath = () => {
    if(!isEmpty(activePath)) {
      activePath.setMap(null)
    }
    if(path && path.length > 0) {
      const newPath = createPath(path, { weight: 6, opacity: 0.5 })
      newPath.setMap(google.map)
      setActivePath(newPath)
      console.log('newPath', path)
    } 
  }
  useEffect(drawPath, [ path ])
  const onMouseDown = () => {
    setDraggable(false)
  }
  const onMouseMove = (childKey, childProps, mouse) => {
    setDraggedPoint({ id: childKey, name: childProps.name, lat: mouse.lat, lng: mouse.lng })
  }
  const onMouseUp = updatePoint => {
    return (childKey, childProps, mouse) => {
      setDraggable(true)
      if(!isEmpty(draggedPoint)) {
        updatePoint({ id: childKey, name: childProps.name, lat: (+draggedPoint.lat).toFixed(6), lng: (+draggedPoint.lng).toFixed(6) })
        setDraggedPoint({})
      }
    }
  }
  const handleGoogleMapApi = (_google) => {
    setGoogle(_google)
    getRoads().then(roads => drawRoads(_google, roads))
  }
  const renderPoint = ({ name, lat, lng, id }) => {
    return (lat && lng && <ImageMarker type={id} key={id} name={name} lat={lat} lng={lng}/>)
  }
  return (
    <PointContext.Consumer>
      {context => {
        const { updatePoint, points } = context
        return (
          <GoogleMapReact
            draggable={draggable}
            bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            onChildMouseDown={onMouseDown}
            onChildMouseMove={onMouseMove}
            onChildMouseUp={onMouseUp(updatePoint)}
            onGoogleApiLoaded={handleGoogleMapApi}
            yesIWantToUseGoogleMapApiInternals
          >
            {points.map(p => renderPoint(p))}
            {renderPoint(draggedPoint)}
          </GoogleMapReact>    
        )
      }}
    </PointContext.Consumer>
  )
}

const defaultProps = {
  center: {
    lat: 43.055455,
    lng: -79.392654
  },
  zoom: 11
}

const isEmpty = object => {
  return Object.entries(object).length === 0 && object.constructor === Object
}

const pathCreator = google => (path, { color, weight, opacity } = {}) => {
  return new google.maps.Polyline({
    path,
    geodesic: true,
    strokeColor: color || '#2BA5FF',
    strokeOpacity: opacity || 1,
    strokeWeight: weight || 4,
    lineCap: "round",
    lineJoin: "round"
  })
}

const drawRoads = (google, roads) => {
  const createPath = pathCreator(google)
  roads.map(r => {
      const color = r.sightSeeing ? randomColor() : '#ccc'
      const weight = r.sightSeeing ? 4 : 1
      // const weight = r.maxSpeed > 1 ? 4 : 1
      // color = r.maxSpeed > 1 ? '#f00' : '#ccc'
      createPath(r.coordinates, { color, weight }).setMap(google.map) 
  })
}