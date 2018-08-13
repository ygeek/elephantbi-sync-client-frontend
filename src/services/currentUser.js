import { requestSimple, requestNoToken } from '../utils/request'

export async function _login(params) {
  return requestNoToken({
    url: '/auth/login',
    method: 'POST',
    body: params
  })
}

export async function _fetchCurrentUser() {
  return requestSimple({
    url: '/user/profile',
    method: 'GET',
  })
}