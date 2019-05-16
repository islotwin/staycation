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
        lng: -78.944970,
        lat: 42.927905    
      },
      {
        id: "to",
        name: "Destination",
        lng: -79.132981,
        lat: 42.962343      
      }
    ],
    minimumSightSeeingDistance: 0,
    path: []
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
    const { points, minimumSightSeeingDistance: minSSDist } = this.state
    const from = points.find(p => p.id === "from")
    const to = points.find(p => p.id === "to")

    getPath({ from, to, minSSDist }).then(path => {
      const p = path.reduce(( acc, curr ) => {
        if(!acc.length) {
          return curr.coordinates
        }
        return acc.concat(curr.coordinates)
      }, [])
      this.setState({ path: p })
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
    const { points, minimumSightSeeingDistance, path } = this.state
    return (
      <PointContext.Provider value={{
        points,
        updatePoint: point => this.updatePoint(point)
      }}>
        <Layout>
          <Column shadow width="20%" minwidth="250px">
            <Form points={points} minSightSeeingDist={minimumSightSeeingDistance} onMinSightSeeingDistChange={this.onMinSightSeeingDistChange}/>
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