import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { _fetchDsList } from '../services/dataSource'

export default {
  namespace: 'dsList',

  state: {
    list: [],
    pageInfo: {
      page: 1,
      pageSize: 20
    },
    canSync: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
     history.listen((location) => {
       const { pathname } = location;
       const match = pathToRegexp('/dataSource/list').exec(pathname)
       if (match) {
         dispatch({ type: 'checkStatus' })
       }
     })
    }
  },

  effects: {
    * checkStatus(action, { select, call, put }) {
      const { firstLogin } = yield select(state => state.currentUser)
      if (firstLogin === 0) {
        yield put({ type: 'fetchDsList' })
      } else {
        yield put({ type: 'fetchAllDsList' })
      }
    },
    * fetchAllDsList(action, { select, call, put }) {
      const { data } = yield call(_fetchDsList, { all: 1 });
      if (data) {
        const dsList = _.get(data, 'list', [])
        const canSync = []
        _.forEach(dsList, (item) => {
          if (item.client === 1) {
            canSync.push(item.id)
          }
        })
        yield put({ type: 'saveCanSync', payload: canSync })
        yield put({ type: 'saveDsList', payload: dsList })
      }
    },
    * fetchDsList(action, { select, call, put }) {
      const { pageInfo } = yield select(state => state.dsList)
      const { data } = yield call(_fetchDsList, {
        page: pageInfo.page,
        page_size: pageInfo.page_size
      });
      if (data) {
        const dsList = _.get(data, 'list', [])
        yield put({ type: 'saveDsList', payload: dsList })
      }
    },
  },

  reducers: {
    saveDsList(state, { payload }) {
      return { ...state, list: payload }
    },
    saveCanSync(state, { payload }) {
      return { ...state, canSync: payload }
    },
    changeCanSync(state, { payload: id }) {
      const { canSync } = state;
      if (canSync.includes(id)) {
        return { ...state, canSync: canSync.filter(item => item !== id) }
      }
      return { ...state, canSync: [...canSync, id] }
    },
    loadmore(state) {
      return {
        ...state,
        pageInfo: {
          ...state.pageInfo,
          page: state.pageInfo.page + 1
        }
      }
    }
  }
}