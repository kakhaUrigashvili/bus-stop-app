import {HTTP} from '../http-common'

export default function getData () {
    return HTTP
    .get('boardings-per-location')
    .then(response => response.data)
  }
  