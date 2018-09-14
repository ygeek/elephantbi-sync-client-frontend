import { requestSimple } from '../utils/request'

export async function _login(params) {
  return requestSimple({
    url: '/auth/login',
    method: 'POST',
    body: params
  })
}

export async function _fetchCurrentUser() {
  return requestSimple({
    url: '/user/profile',
    method: 'GET'
  })
}