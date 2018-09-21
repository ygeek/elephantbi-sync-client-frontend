import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import {
  _fetchDsDetail,
  _fetchTableIds,
  _fetchDsLog,
  _changeColumns,
  _deleteDs,
  _fetchDataSourceLog,
  _startSync,
  _stopSync,
  _fetchUsers,
  _confirmSync,
  _tranferUser
} from '../services/dataSource'

export default {
  namespace: 'dsDetail',

  state: {
    dsId: null,
    tableIds: [],
    activeKey: '0',
    dsDetail: null,
    dsLog: [],
    currentTable: null,
    transferModalVisible: false,
    users: [],
    loadingCount: 0,
    syncTime: null
  },

  subscriptions: {
    setup({ dispatch, history }) {
     history.listen((location) => {
       const { pathname } = location;
       const match = pathToRegexp('/dsDetail/:id').exec(pathname)
       if (match) {
         dispatch({ type: 'saveDsId', payload: match[1] })
         dispatch({ type: 'fetchTableIds' })
         dispatch({ type: 'fetchUsers' })
       } else {
         dispatch({ type: 'clearState' })
       }
     })
    }
  },

  effects: {
    * fetchTableIds(action, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { dsId } = yield select(state => state.dsDetail)
      const { data } = yield call(_fetchTableIds, dsId)
      if (data) {
        yield put({ type: 'saveTableIds', payload: data })
        if (data.length > 0) {
          yield put({ type: 'fetchDsDetail' })
          yield put({ type: 'fetchDsLog' })
        }
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * fetchDsDetail(action, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { dsId, tableIds, activeKey } = yield select(state => state.dsDetail)
      const tableId = _.get(tableIds[activeKey], 'id', null)
      const { data } = yield call(_fetchDsDetail, dsId, { table_id: tableId })
      if (data) {
        yield put({ type: 'saveDsDetail', payload: data })
        const table = _.get(data, 'tables[0]');
        yield put({ type: 'saveCurrentTable', payload: table })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },

    * fetchDsLog(action, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { activeKey, tableIds } = yield select(state => state.dsDetail)
      if (tableIds.length === 0) {
        yield put({ type: 'changeLoading', payload: 'sub' })
        return
      }
      const tableId = tableIds[activeKey].id
      const { data } = yield call(_fetchDsLog, tableId)
      if (data) {
        yield put({ type: 'setDsLog', payload: data.list })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * changeColumns({ payload }, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { params, serial } = payload
      const { dsDetail } = yield select(state => state.dsDetail)
      const columns = _.get(dsDetail, 'tables[0].columns')
      const tableId = _.get(dsDetail, 'tables[0].table_id')
      const newColumns = columns.map((column, index) => {
        if (index === serial) {
          return { ...column, ...(params || {}) }
        }
        return column
      })
      const { data, err } = yield call(_changeColumns, tableId, { columns: newColumns })
      if (data) {
        yield put({ type: 'fetchDsDetail' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * tranferUser({ payload }, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { dsId } = yield select(state => state.dsDetail);
      const { data } = yield call(_tranferUser, payload, dsId)
      if (data) {
        yield put(routerRedux.push('/dataSource/list'))
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * deleteDs(action, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { dsId } = yield select(state => state.dsDetail)
      const { data } = yield call(_deleteDs, dsId)
      if (data) {
        yield put(routerRedux.push('/dataSource/list'))
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * startSync({ payload: type }, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { dsId } = yield select(state => state.dsDetail)
      const { data } = yield call(_startSync, dsId, { sync_now: type })
      if (data && data.success) {
        yield put({ type: 'fetchDsDetail' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * stopSync(action, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { dsId } = yield select(state => state.dsDetail)
      const { data } = yield call(_stopSync, dsId)
      if (data && data.success) {
        yield put({ type: 'fetchDsDetail' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * confirmSync(action, { select, call, put }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { dsId } = yield select(state => state.dsDetail)
      const { data } = yield call(_confirmSync, dsId)
      if (data && data.success) {
        yield put({ type: 'fetchDsDetail' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * fetchUsers(action, { select, put, call }) {
      yield put({ type: 'changeLoading', payload: 'add' })
      const { data } = yield call(_fetchUsers);
      if (data) {
        yield put({ type: 'setUsers', payload: data })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * setSyncStatus({ payload }, { select, call, put }) {
      yield put({ type: 'fetchTableIds' })
    }
  },

  reducers: {
    changeLoading(state, { payload }) {
      return {
        ...state,
        loadingCount: payload === 'add' ? state.loadingCount + 1 : state.loadingCount - 1
      }
    },
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
    },
    setUsers(state, { payload }) {
      return { ...state, users: payload }
    },
    showTransferModal(state) {
      return { ...state, transferModalVisible: true }
    },
    hideTransferModal(state) {
      return { ...state, transferModalVisible: false }
    },
    clearState(state) {
      return {
        ...state,
        dsId: null,
        tableIds: [],
        activeKey: '0',
        dsDetail: null,
        dsLog: [],
        currentTable: null,
        transferModalVisible: false,
        users: [],
        loadingCount: 0,
        syncTime: null
      }
    },
    setSyncTime(state, { payload }) {
      const id = _.get(payload, 'ds_id')
      if (`${id}` === `${state.dsId}`) {
        return {
          ...state,
          syncTime: payload
        }
      }
      return state
    },
    setSyncStatus(state, { payload }) {
      const id = _.get(payload, 'ds_id')
      if (`${id}` === `${state.dsId}`) {
        const syncStatus = _.get(payload, 'ds_status')
        return {
          ...state,
          dataSource: {
            ...state.dataSource,
            sync_status: syncStatus
          }
        }
      }
      return state
    }
  }
}