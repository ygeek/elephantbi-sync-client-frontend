import { requestSimple } from '../utils/request'

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

export async function _fetchDsList(params) {
  return requestSimple({
    method: 'GET',
    url: '/ds/list',
    params
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

export async function _changeColumns(columns) {
  return requestSimple({
    url: '',
    method: 'POST',
    body: {
      columns
    }
  })
}

export async function _editDbDatasource(id, params) {
  return requestSimple({
    url: `/ds/db/${id}`,
    method: 'PUT',
    body: params
  })
}
