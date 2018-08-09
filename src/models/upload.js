import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { _connectDatabase, _fetchDbDataSource } from 'services/upload'

export default {
  namespace: 'upload',

  state: {
    filterTableList: [],
    sourceType: null,
    currentStep: 0,
    databaseInfo: null,
    dataSource: null,
    sublimeData: null,
    tableInfo: null,
    description: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match1 = pathToRegexp('/selectDatabase').exec(pathname);
        const match2 = pathToRegexp('/database').exec(pathname);
        if (!match1 && !match2) {
          dispatch({ type: 'resetState' })
        }
      })
    }
  },

  effects: {
    * connectDatabase(action, { select, call, put }) {
      const { databaseInfo } = yield select(state => state.upload);
      const { data, err } = yield call(_connectDatabase, databaseInfo);
      if (data) {
        yield put({ type: 'saveTableInfo', payload: data })
        yield put({ type: 'fetchdbDataSource' })
      }
    },

    * fetchdbDataSource(action, { select, call, put }) {
      const { databaseInfo } = yield select(state => state.upload)
      const { data, err } = yield call(_fetchDbDataSource, databaseInfo)
      if (data) {
        yield put({ type: 'saveDataSource', payload: data })
        yield put({ type: 'changeStep', payload: 'after' })
      }
    }
  },

  reducers: {
    changeFilterTableList(state, { payload }) {
      return { ...state, filterTableList: payload }
    },
    setSourceType(state, { payload }) {
      return { ...state, sourceType: payload }
    },
    changeStep(state, { payload }) {
      return {
        ...state,
        currentStep: payload === 'prev' ? state.currentStep - 1 : state.currentStep + 1
      }
    },
    setDatabaseInfo(state, { payload }) {
      return { ...state, databaseInfo: payload }
    },
    saveTableInfo(state, { payload }) {
      return { ...state, tableInfo: payload }
    },
    saveDataSource(state, { payload }) {
      const tableData = _.get(payload, 'preview')
      const tableInfo = _.get(state, 'tableInfo')
      const tableNames = []
      const tableToColumns = {}
      const sync_info = {}
      tableData.forEach((item) => {
        tableNames.push({ new_table_name: item.table_name, old_table_name: item.table_name })
        Object.assign(tableToColumns, { [item.table_name]: item.columns })
        Object.assign(sync_info, { [item.table_name]: { sync_mode: 'all', column: null } })
      })
      return {
        ...state,
        dataSource: payload,
        sublimeData: {
          name: _.get(tableInfo, 'origin_name'),
          description: _.get(state, 'description'),
          table_names: tableNames,
          table_to_columns: tableToColumns,
          sync_info
        }
      }
    },

    filterTableNames(state) {
      const { filterTableList } = state;
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          table_names: state.sublimeData.table_names.filter(item => (filterTableList.includes(item.old_table_name)))
        }
      }
    },

    changeTableToColumns(state, { payload }) {
      const { tableName, params, serial } = payload
      const OldColumns = _.get(state, `sublimeData.table_to_columns.${tableName}`);
      const newColumns = OldColumns.map((item, index) => {
        return index !== serial ? item : { ...item, ...params }
      })
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          table_to_columns: {
            ...state.sublimeData.table_to_columns,
            [tableName] : newColumns
          }
        }
      }
    },

    changeSyncInfo(state, { payload }) {
      const { name, params } = payload;
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          sync_info: {
            ...state.sublimeData.sync_info,
            [name]: {
              ...state.sublimeData.sync_info[name],
              ...params,
            }
          }
        }
      }
    },

    changeFileName(state, { payload }) {
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          name: payload
        }
      }
    },

    changeDescription(state, { payload }) {
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          description: payload
        }
      }
    },

    changeTableNames(state, { payload }) {
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          table_names: state.sublimeData.table_names.map((item) => {
            return {
              ...item,
              new_table_name: payload[item.old_table_name]
            }
          })
        }
      }
    },

    submitSyncCycle(state, { payload }) {
      return {
        ...state,
        sublimeData: {
          ...state.sublimeData,
          ...payload
        }
      }
    }
  }
}