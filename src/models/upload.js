import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import { routerRedux } from 'dva/router'
import { _connectDatabase, _fetchDbDataSource, _saveDataSource } from 'services/upload'

export default {
  namespace: 'upload',

  state: {
    filterTableList: [],
    sourceType: null,
    currentStep: 0,
    databaseInfo: null,
    dataSource: null,
    sublimeData: null,
    tableColumns: null,
    description: null,
    dbType: null,
    loadingCount: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname, search } = location;
        const match1 = pathToRegexp('/selectDatabase').exec(pathname);
        const match2 = pathToRegexp('/database').exec(pathname);
        if (search) {
          const matchSearch = search.match(/dbType=(.*)&sourceType=(.*)/)
          dispatch({ type: 'setDbType', payload: matchSearch[1] })
          dispatch({ type: 'setSourceType', payload: matchSearch[2] })
        }
        if (!match1 && !match2) {
          dispatch({ type: 'resetState' })
        }
      })
    }
  },

  effects: {
    * connectDatabase(action, { select, call, put }) { //5001
      const { databaseInfo, dbType } = yield select(state => state.upload);
      yield put({ type: 'changeLoading', payload: 'add' })
      const { data, err } = yield call(_connectDatabase, {
        ...databaseInfo,
        db_type: `${dbType}`
      });
      if (data && data.status >= 200 && data.status < 300) {
        yield put({ type: 'saveTableColumns', payload: data.data })
        yield put({ type: 'fetchdbDataSource' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },

    * fetchdbDataSource(action, { select, call, put }) { //5001
      const { databaseInfo, dbType } = yield select(state => state.upload)
      yield put({ type: 'changeLoading', payload: 'add' })
      const { data, err } = yield call(_fetchDbDataSource, {
        ...databaseInfo,
        db_type: `${dbType}`
      })
      if (data && data.status >= 200 && data.status < 300) {
        yield put({ type: 'saveDataSource', payload: data.data })
        yield put({ type: 'changeStep', payload: 'after' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },

    * createDbDs(action, { select, call, put }) {
      const {
        databaseInfo,
        sublimeData,
        dbType,
        sourceType,
        filterTableList
      } = yield select(state => state.upload)
      yield put({ type: 'changeLoading', payload: 'add' })
      const params = {
        ...databaseInfo,
        db_type: dbType,
        source_type: sourceType,
        ...sublimeData,
        table_info: _.get(sublimeData, 'table_names').filter(item => filterTableList.includes(item.old_table_name))
      }
      const { data, err } = yield call(_saveDataSource, params)
      if (data) {
        yield put(routerRedux.push('/dataSource/list'))
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    }
  },

  reducers: {
    resetState(state) {
      return {
        ...state,
        filterTableList: [],
        sourceType: null,
        currentStep: 0,
        databaseInfo: null,
        dataSource: null,
        sublimeData: null,
        tableColumns: null,
        description: null,
        dbType: null,
        loadingCount: 0
      }
    },
    changeLoading(state, { payload }) {
      return {
        ...state,
        loadingCount: payload === 'add' ? state.loadingCount + 1 : state.loadingCount - 1
      }
    },
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
    saveTableColumns(state, { payload }) {
      return { ...state, tableColumns: payload }
    },
    saveDataSource(state, { payload }) {
      const tableData = payload
      const tableColumns = _.get(state, 'tableColumns', [])
      const tableNames = []
      const tableToColumns = {}
      const sync_mode = {}
      const allTableData = tableColumns.map((item, index) => {
        return {
          ...item,
          ...tableData[index]
        }
      })
      const filterTableList = []
      allTableData.forEach((item) => {
        tableNames.push({ new_table_name: item.table_name, old_table_name: item.table_name })
        Object.assign(tableToColumns, { [item.table_name]: item.columns })
        Object.assign(sync_mode, { [item.table_name]: { mode: '0', by_col_name: null, by_col_uuid: null } })
        filterTableList.push(item.table_name)
      })

      return {
        ...state,
        dataSource: allTableData,
        sublimeData: {
          name: null,
          description: _.get(state, 'description'),
          table_names: tableNames,
          table_to_columns: tableToColumns,
          sync_mode
        },
        filterTableList
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
          sync_mode: {
            ...state.sublimeData.sync_mode,
            [name]: {
              ...state.sublimeData.sync_mode[name],
              ...params
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
    },
    setDbType(state, { payload }) {
      return {
        ...state,
        dbType: payload
      }
    }
  }
}