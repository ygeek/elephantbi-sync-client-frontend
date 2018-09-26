import pathToRegexp from 'path-to-regexp';
import { _login } from '../services/currentUser'

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
      yield put({ type: 'currentUser/setDomain', payload: domain })
      const { err, data } = yield call(_login, params)
      if (err) {
        return new Promise((resolve, reject) => { reject(err) })
      }
      if (data) {
        yield put({ type: 'currentUser/setToken', payload: data.access_token })
        yield put({ type: 'currentUser/fetchCurrentUser' })
        yield put({ type: 'currentUser/setFirstLogin' })
      }
      return null
    },
  },

  reducers: {

  }
}