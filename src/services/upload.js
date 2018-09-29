import _ from 'lodash'
import { requestSimple } from '../utils/request'
const domain = _.get(JSON.parse(localStorage.getItem('reduxState')), 'currentUser.domain')

export async function _connectDatabase(params) { //5001
  return requestSimple({
    method: 'POST',
    url: '/ds/db/conn',
    body: {
      ...params,
      domain
    },
    host: window.newHost
  })
}

export async function _fetchDbDataSource(params) { //5001
  return requestSimple({
    url: '/ds/db/preview',
    method: 'GET',
    params: {
      ...params,
      domain
    },
    host: window.newHost
  })
}

export async function _saveDataSource(params) { //5001
  return requestSimple({
    url: '/ds/db/create',
    method: 'POST',
    body: {
      ...params,
      domain
    },
    host: window.newHost
  })
}