import {HTTP} from '../http-common'

export default function getMap () {
    return HTTP
    .get('chicago-geo-map')
    .then(response => response.data)
  }
  