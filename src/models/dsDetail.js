import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import { _fetchDsDetail, _fetchTableIds, _fetchDsLog, _changeColumns, _deleteDs } from '../services/dataSource'

export default {
  namespace: 'dsDetail',

  state: {
    dsId: null,
    tableIds: [],
    activeKey: '0',
    dsDetail: null,
    dsLog: [],
    currentTable: null,
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
        if (data.length > 0) {
          yield put({ type: 'fetchDsDetail' })
          yield put({ type: 'fetchDsLog' })
        }
      }
    },
    * fetchDsDetail(action, { select, call, put }) {
      const { dsId, tableIds, activeKey } = yield select(state => state.dsDetail)
      const tableId = tableIds[activeKey].id
      const { data } = yield call(_fetchDsDetail, dsId, { table_id: tableId })
      if (data) {
        yield put({ type: 'saveDsDetail', payload: data })
        const table = _.get(data, 'tables[0]');
        yield put({ type: 'saveCurrentTable', payload: table })
      }
    },

    * fetchDsLog(action, { select, call, put }) {
      const { activeKey, tableIds } = yield select(state => state.dsDetail)
      const tableId = tableIds[activeKey].id
      const { data } = yield call(_fetchDsLog, tableId)
      if (data) {
        yield put({ type: 'setDsLog', payload: data.list })
      }
    },
    * changeColumns({ payload }, { select, call, put }) {
      const { params, serial } = payload;
      const { currentTable } = yield select(state => state.dsDetail)
      const originColumn = _.get(currentTable, 'columns', [])
      const newColumns = originColumn.map((column, index) => {
        if (index !== serial) {
          return column
        }
        return { ...column, ...params }
      })
      const { data } = yield call(_changeColumns, newColumns)
      if (data) {
        yield put({ type: 'fetchDsDetail' })
      }
    },
    * deleteDs(action, { select, call, put }) {
      const { dsId } = yield select(state => state.dsDetail)
      const { data } = yield call(_deleteDs, dsId)
      if (data) {
        yield put(routerRedux.push('/dataSource/list'))
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
    },
    setDsLog(state, { payload }) {
      return { ...state, dsLog: payload }
    },
    saveCurrentTable(state, { payload }) {
      return { ...state, currentTable: payload }
    }
  }
}