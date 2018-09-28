import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { _login, _checkDomain } from '../services/currentUser'
import { _fetchDsList } from '../services/dataSource'

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
            yield put({ type: 'fetchDsList' })
          }
          return { err, data }
        }
      }
      if (err) {
        return { err, data }
      }
    },
    * fetchDsList(action, { select, call, put }) {
      const { data } = yield call(_fetchDsList, { all: 1 });
      if (data) {
        const dsList = _.get(data, 'list', [])
        if (dsList.length > 0) {
          yield put({ type: 'currentUser/setFirstLogin' })
        } else {
          yield put({ type: 'currentUser/changeStatus' })
        }
      }
    }
  },

  reducers: {

  }
}