import { requestSimple } from 'utils/request'

export async function _connectDatabase(params) {
  return requestSimple({
    method: 'POST',
    url: '/ds/db/conn',
    body: params
  })
}

export async function _fetchDbDataSource(params) {
  return requestSimple({
    url: '/ds/db/preview',
    method: 'GET',
    params
  })
}

export async function _saveDataSource(params) {
  return requestSimple({
    url: '/ds/db/create',
    method: 'POST',
    body: params
  })
}