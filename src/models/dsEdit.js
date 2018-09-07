import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import { _fetchTableIds, _fetchDsDetail, _editDbDatasource } from '../services/dataSource'

export default {
  namespace: 'dsEdit',

  state: {
    dsId: null,
    cycle: 'hour',
    startTime: '06:00',
    endTime: '09:00',
    time: '06:00',
    week: 'Mon',
    month: 'Jan',
    date: 'last',
    retry: true,
    retryInterval: '30sec',
    retryMost: '1'
  },

  subscriptions: {
    setup({ dispatch, history }) {
     history.listen((location) => {
       const { pathname } = location;
       const match = pathToRegexp('/ds/edit/:id').exec(pathname)
       if (match) {
         dispatch({ type: 'saveDsId', payload: match[1] })
         dispatch({ type: 'fetchTableIds' })
       }
     })
    }
  },

  effects: {
    * fetchTableIds(action, { select, call, put }) {
      const { dsId } = yield select(state => state.dsEdit)
      const { data, err } = yield call(_fetchTableIds, dsId)
      if (err) {

      }
      if (data) {
        yield put({ type: 'setTableIds', payload: data })
        yield put({ type: 'fetchDataSourceDetail' })
      }
    },

    * fetchDataSourceDetail(action, { select, call, put }) {
      const { dsId } = yield select(state => state.dsEdit)
      const { data, err } = yield call(_fetchDsDetail, dsId)
      if (err) {

      }
      if (data) {
        yield put({ type: 'setDataSource', payload: data })
      }
    },

    * editDbDatasource({ payload }, { select, call, put }) {
      const { sublimeData, dataSource } = yield select(state => state.dbEdit)
      const dbId = _.get(dataSource, 'database.id')
      const {
        db_name: dbName,
        description,
        host,
        port,
        name,
        password,
        username,
        source_type: sourceType,
        ...tableNames
      } = payload
      const params = {
        db_name: dbName,
        description,
        host,
        port,
        name,
        password,
        username,
        tableNames,
        sync_mode: sublimeData.syncMode,
        ...sublimeData.syncInfo
      }
      const { data } = yield call(_editDbDatasource, dbId, params)
      if (data) {
        yield put(routerRedux.goBack())
      }
    }
  },

  reducers: {
    saveDsId(state, { payload }) {
      return { ...state, dsId: payload }
    },
    changeSyncCycle(state, { payload }) {
      return { ...state, ...payload }
    },
    setTableIds(state, { payload }) {
      return { ...state, tableIds: payload }
    },
    setDataSource(state, { payload }) {
      const { tableIds } = state
      const tableNames = tableIds.map((item) => {
        return { id: item.id, new_table_name: item.name, old_table_name: item.name }
      })
      const database = _.get(payload, 'database')
      const syncConfig = _.get(database, 'sync_config')
      const { sync_mode: syncMode, ...syncInfo } = syncConfig
      const tableToColumns = {}
      const tables = _.get(payload, 'tables', [])
      _.forEach(tables, (item) => {
        Object.assign(tableToColumns, { [item.table_name]: item.columns })
      })

      return {
        ...state,
        dataSource: payload,
        sublimeData: {
          syncInfo,
          syncMode
        },
        tableNames,
        tableToColumns
      }
    },

    changeSyncInfo(state, { payload }) {
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          syncInfo: {
            ...state.sublimeData.syncInfo,
            ...payload
          }
        }
      }
    },

    changeSchedule(state, { payload }) {
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          syncInfo: {
            ...state.sublimeData.syncInfo,
            schedule: {
              ...state.sublimeData.syncInfo.schedule,
              ...payload
            }
          }
        }
      }
    },

    changeSyncMode(state, { payload }) {
      const { name, params } = payload
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          syncMode: {
            ...state.sublimeData.syncMode,
            [name]: {
              ...state.sublimeData.syncMode[name],
              ...params
            }
          }
        }
      }
    }
  }
}