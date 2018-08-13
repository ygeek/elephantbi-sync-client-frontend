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
      const { err, data } = yield call(_login, payload)
      if (err) {
        return new Promise((resolve, reject) => { reject(err) })
      }
      if (data) {
        yield put({ type: 'currentUser/setToken', payload: data.access_token })
        yield put({ type: 'currentUser/fetchCurrentUser' })
      }
      return null
    },
  },

  reducers: {

  }
}