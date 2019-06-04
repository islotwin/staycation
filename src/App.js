import React from 'react'
import './App.css'
import { Column } from './components/UI/Column/Column'
import { Layout } from './components/UI/Layout/Layout'
import { Map } from './containers/Map/Map'
import { Form } from './containers/Form/Form';
import { PointContext } from './context/point-context';
import { getPath } from './services/StaycationService/StaycationService';
import { ActionBlock } from './components/ActionBlock/ActionBlock';

class App extends React.Component {
  defaultState = {
    points: [
      {
        id: "from",
        name: "Starting point",
        lng: -79.231243,
        lat: 42.965433    
      },
      {
        id: "to",
        name: "Destination",
        lng: -79.332523,
        lat: 43.017165     
      }
    ],
    minimumSightSeeingDistance: 0,
    path: [],
    shortestPathMode: true,
    executionTime: 0,
    time: 0,
    sightSeeingDistance: 0,
    distance: 0
  }
  state = this.defaultState
  updatePoint = ({ id, name, lng, lat }) => {
    this.setState((prevState, _) => {
      return {
        points: prevState.points.map(p => p.id === id ? { id, name, lng: +lng, lat: +lat } : p)
      }
    })
  }
  onMinSightSeeingDistChange = event => {
    this.setState({ minimumSightSeeingDistance: event.target.value})
  }
  findPath = () => {
    const { points, minimumSightSeeingDistance: minSSDist, shortestPathMode: shortestPath } = this.state
    const from = points.find(p => p.id === "from")
    const to = points.find(p => p.id === "to")

    getPath({ from, to, minSSDist, shortestPath }).then(({ path, sightSeeingDistance, distance, executionTime, time }) => {
      console.log('sightSeeingDistance', sightSeeingDistance)
      console.log('distance', distance)
      console.log('executionTime', executionTime)
      console.log('time', time)
      const p = path.reduce(( acc, curr ) => {
        if(!acc.length) {
          return curr.coordinates
        }
        return acc.concat(curr.coordinates)
      }, [])
      this.setState({ path: p, executionTime, time, sightSeeingDistance, distance })
    })
  }
  resetState = () => {
    this.setState({ ...this.defaultState })
  }
  clearState = () => {
    this.setState({ path: [] })
  }
  actions = [
    {
      className: "Success",
      onClick: this.findPath,
      text: "Find path"
    },
    {
      // className: "Danger",
      onClick: this.clearState,
      text: "Clear"
    }
  ]
  render() {
    const { points, minimumSightSeeingDistance, path, shortestPathMode, time, executionTime, distance, sightSeeingDistance } = this.state
    return (
      <PointContext.Provider value={{
        points,
        updatePoint: point => this.updatePoint(point)
      }}>
        <Layout>
          <Column shadow width="20%" minwidth="250px">
            <Form 
              points={points} 
              minSightSeeingDist={minimumSightSeeingDistance} 
              onMinSightSeeingDistChange={this.onMinSightSeeingDistChange}
              shortestPathMode={shortestPathMode}
              setSearchMode={checked => this.setState({ shortestPathMode: checked })}
              time={time}
              executionTime={executionTime}
              distance={distance}
              sightSeeingDistance={sightSeeingDistance}
            />
            <ActionBlock actions={this.actions}/>
          </Column>
          <Column width="80%">
            <Map path={path}/>
          </Column>
        </Layout>
      </PointContext.Provider>
    )  
  }
}

export default App;