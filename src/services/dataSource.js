/*global window*/
import _ from 'lodash'
import { requestSimple } from '../utils/request'
const domain = _.get(JSON.parse(localStorage.getItem('reduxState')), 'currentUser.domain')

export async function _fetchDsDetail(id, params) {
  return requestSimple({
    method: 'GET',
    url: `/ds/${id}`,
    params
  })
}

export async function _fetchTableIds(id) {
  return requestSimple({
    method: 'GET',
    url: `/ds/${id}/tables`
  })
}

export async function _fetchDsList(params) { //5001
  return requestSimple({
    method: 'GET',
    url: '/ds/list',
    params: {
      ...params,
      domain
    },
    host: window.newHost
  })
}

export async function _deleteDs(id) {
  return requestSimple({
    method: 'delete',
    url: `ds/${id}`
  })
}

export async function _fetchUsers() {
  return requestSimple({
    method: 'GET',
    url: '/users'
  })
}

export async function _fetchGroups() {
  return requestSimple({
    method: 'GET',
    url: '/groups'
  })
}

export async function _tranferUser(params, id) {
  return requestSimple({
    url: `/ds/${id}/owner`,
    method: 'POST',
    body: params
  })
}

export async function _fetchDsLog(id) {
  return requestSimple({
    url: `/table/${id}/logs`,
    method: 'GET'
  })
}

export async function _editDbDatasource(id, params) {
  return requestSimple({
    url: `/ds/db/${id}`,
    method: 'PUT',
    body: params
  })
}

export async function _startSync(id, params) { //5001
  return requestSimple({
    url: `/ds/${id}/sync`,
    method: 'POST',
    body: {
      ...params,
      domain
    },
    host: window.newHost
  })
}

export async function _stopSync(id) { //5001
  return requestSimple({
    url: `/ds/${id}/sync`,
    method: 'DELETE',
    body: { domain },
    host: window.newHost
  })
}

export async function _confirmSync(id) {
  return requestSimple({
    url: `/ds/${id}/sync/confirm`,
    method: 'POST'
  })
}

export async function _changeColumns(id, params) {
  return requestSimple({
    url: `/table/${id}/info`,
    method: 'PUT',
    body: params
  })
}

export async function _batchSync(params) {
  return requestSimple({
    url: `/ds/list/sync`,
    method: 'POST',
    body: {
      params,
      domain
    },
    host: window.newHost
  })
}
