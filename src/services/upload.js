import { requestSimple } from 'utils/request'

export async function _connectDatabase(params) { //5001
  return requestSimple({
    method: 'POST',
    url: '/ds/db/conn',
    body: params,
    host: window.newHost
  })
}

export async function _fetchDbDataSource(params) { //5001
  return requestSimple({
    url: '/ds/db/preview',
    method: 'GET',
    params,
    host: window.newHost
  })
}

export async function _saveDataSource(params) { //5001
  return requestSimple({
    url: '/ds/db/create',
    method: 'POST',
    body: params,
    host: window.newHost
  })
}