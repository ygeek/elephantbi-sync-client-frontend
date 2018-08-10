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