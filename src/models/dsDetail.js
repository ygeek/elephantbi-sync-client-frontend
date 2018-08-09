import pathToRegexp from 'path-to-regexp';
import { _fetchDsDetail, _fetchTableIds } from '../services/dataSource'

export default {
  namespace: 'dsDetail',

  state: {
    dsId: null,
    tableIds: [],
    activeKey: '0',
    dsDetail: null
  },

  subscriptions: {
    setup({ dispatch, history }) {
     history.listen((location) => {
       const { pathname } = location;
       const match = pathToRegexp('/dsDetail/:id').exec(pathname)
       if (match) {
         dispatch({ type: 'saveDsId', payload: match[1] })
         dispatch({ type: 'fetchTableIds' })
       }
     })
    }
  },

  effects: {
    * fetchTableIds(action, { select, call, put }) {
      const { dsId } = yield select(state => state.dsDetail)
      const { data } = yield call(_fetchTableIds, dsId)
      if (data) {
        yield put({ type: 'saveTableIds', payload: data })
        yield put({ type: 'fetchDsDetail' })
      }
    },
    * fetchDsDetail(action, { select, call, put }) {
      const { dsId, tableIds, activeKey } = yield select(state => state.dsDetail)
      const tableId = tableIds[activeKey].id
      const { data } = yield call(_fetchDsDetail, dsId, { table_id: tableId })
      if (data) {
        yield put({ type: 'saveDsDetail', payload: data })
      }
    }
  },

  reducers: {
    saveDsId(state, { payload }) {
      return { ...state, dsId: payload }
    },
    saveTableIds(state, { payload }) {
      return { ...state, tableIds: payload }
    },
    saveDsDetail(state, { payload }) {
      return { ...state, dsDetail: payload }
    },
    changeActiveKey(state, { payload }) {
      return { ...state, activeKey: payload }
    }
  }
}