import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { _connectDatabase, _fetchDbDataSource } from 'services/upload'

export default {
  namespace: 'upload',

  state: {
    sourceType: null,
    currentStep: 0,
    databaseInfo: null,
    dataSource: null,
    sublimeData: null,
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
    saveDataSource(state, { payload }) {
      const tableData = _.get(payload, 'preview')
      const tableNames = []
      const tableToColumns = {}
      tableData.forEach((item) => {
        tableNames.push({ new_table_name: item.table_name, old_table_name: item.table_name })
        Object.assign(tableToColumns, { [item.table_name]: item.columns })
      })
      return {
        ...state,
        dataSource: payload,
        sublimeData: {
          table_names: tableNames,
          table_to_columns: tableToColumns,
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
    }
  }
}