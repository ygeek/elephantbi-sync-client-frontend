import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import { _fetchCurrentUser } from '../services/currentUser'

export default {
  namespace: 'currentUser',

  state: {
    firstLogin: 1,
    token: null,
    domain: null
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/(.*)').exec(pathname)
        const matchLogin = pathToRegexp('/login').exec(pathname)
        if (match && !matchLogin) {
          dispatch({ type: 'fetchCurrentUserWithoutJump' })
        }
      })
    }
  },

  effects: {
    * fetchCurrentUser(action, { select, call, put }) {
      const { token } = yield select(state => state.currentUser)
      const { data, err } = yield call(_fetchCurrentUser, token)
      if (err) {
        const status = _.get(err, 'response.status')
        if (status === 401) {
          yield put({ type: 'logOut' })
        }
      }
      if (data) {
        yield put({ type: 'setCurrentUser', payload: data })
        yield put(routerRedux.push('/'))
      }
    },
    * fetchCurrentUserWithoutJump(action, { select, call, put }) {
      const { token } = yield select(state => state.currentUser)
      const { data, err } = yield call(_fetchCurrentUser, token)
      if (err) {
        const status = _.get(err, 'response.status')
        if (status === 401) {
          yield put({ type: 'logOut' })
        }
      }
      if (data) {
        yield put({ type: 'setCurrentUser', payload: data })
      }
    },
    * logOut(action, { select, call, put }) {
      yield put({ type: 'clearCurrentUser' })
      localStorage.removeItem('reduxState')
      yield put(routerRedux.push('/login'))
    },
  },

  reducers: {
    changeStatus(state) {
      return { ...state, firstLogin: 0 }
    },
    setToken(state, { payload: token }) {
      return { ...state, token }
    },
    clearCurrentUser(state) {
      return {
        token: null,
        companyInfo: null
      }
    },
    setCurrentUser(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    setDomain(state, { payload: domain }) {
      return { ...state, domain }
    },
    setFirstLogin(state) {
      return {
        ...state,
        firstLogin: 1
      }
    }
  }
}