import axios from 'axios'

const URL = 'http://localhost:8080'

export const getPath = ({ from, to, minSSDist, shortestPath }) => {
  return axios.get(URL + '/roads/path', {
    params: {
      flng: from.lng,
      flat: from.lat,
      tlng: to.lng,
      tlat: to.lat,
      dist: minSSDist,
      shortest: shortestPath
    }
  }).then(res => res.data)
  // return new Promise((resolve, reject) => {
  //   resolve([ { "lat": 59.955413, "lng": 30.337844 },{ "lat": 60.005413, "lng": 30.137844 },{ "lat": 60.155413, "lng": 29.937844 } ])
  // })
  // return Promise.resolve([ { "lat": 53.480759, "lng": -2.242631 },{ "lat": 51.507351, "lng": -0.127758 },{ "lat": 55.953252, "lng": -3.188267 } ]);
}

export const getRoads = () => {
  return axios.get(URL + '/roads').then(res => res.data)
}
