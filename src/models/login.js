import pathToRegexp from 'path-to-regexp';
import { _login, _checkDomain } from '../services/currentUser'

export default {
  namespace: 'login',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/login').exec(pathname)
        if (match) {
        }
      })
    }
  },

  effects: {
    * fetchToken({ payload }, { select, call, put }) {
      const { domain, ...params } = payload;
      const { data, err } = yield call(_checkDomain, { domain })
      if (data) {
        if (!data.exists) {
          return { data, err }
        }
        if (data.exists) {
          yield put({ type: 'currentUser/setDomain', payload: domain })
          const { err, data } = yield call(_login, params)
          if (err) {
          }
          if (data) {
            yield put({ type: 'currentUser/setToken', payload: data.access_token })
            yield put({ type: 'currentUser/fetchCurrentUser' })
            yield put({ type: 'currentUser/setFirstLogin' })
          }
          return { err, data }
        }
      }
      if (err) {
        return { err, data }
      }
    },
  },

  reducers: {

  }
}