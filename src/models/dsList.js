import pathToRegexp from 'path-to-regexp';
import _ from 'lodash'
import {
  _fetchDsList,
  _deleteDs,
  _fetchUsers,
  _fetchGroups,
  _tranferUser,
  _startSync,
  _stopSync,
  _confirmSync,
  _batchSync
} from '../services/dataSource'

export default {
  namespace: 'dsList',

  state: {
    list: [],
    pageInfo: {
      page: 1,
      pageSize: 12
    },
    canSync: [],
    users: [],
    groups: [],
    transferModalVisible: false,
    currentTransferId: null,
    meta: null,
    loadingCount: 0,
    syncStatus: null
  },

  subscriptions: {
    setup({ dispatch, history }) {
     history.listen((location) => {
       const { pathname } = location;
       const match = pathToRegexp('/dataSource/list').exec(pathname)
       if (match) {
         dispatch({ type: 'checkStatus' })
         dispatch({ type: 'fetchUsers' })
       } else {
         dispatch({ type: 'clearState' })
       }
     })
    }
  },

  effects: {
    * checkStatus(action, { select, call, put }) {
      const { firstLogin } = yield select(state => state.currentUser)
      if (firstLogin) {
        yield put({ type: 'fetchAllDsList' })
      } else {
        yield put({ type: 'fetchDsList' })
      }
    },
    * fetchAllDsList(action, { select, call, put }) { //5001
      const { data } = yield call(_fetchDsList, { all: 1 });
      yield put({ type: 'changeLoading', payload: 'add' })
      if (data) {
        const dsList = _.get(data, 'list', [])
        const canSync = []
        _.forEach(dsList, (item) => {
          if (!_.get(item, 'other_client')) {
            canSync.push(item.id)
          }
        })
        yield put({ type: 'saveCanSync', payload: canSync })
        yield put({ type: 'saveDsList', payload: { 1: dsList } })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * fetchDsList(action, { select, call, put }) { //5001
      const { pageInfo } = yield select(state => state.dsList)
      yield put({ type: 'changeLoading', payload: 'add' })
      const { data } = yield call(_fetchDsList, {
        page: pageInfo.page,
        page_size: pageInfo.pageSize
      });
      if (data) {
        const dsList = _.get(data, 'list', [])
        yield put({ type: 'saveDsList', payload: { [data.meta.current_page]: dsList} })
        yield put({ type: 'setMeta', payload: data.meta })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * deleteDs({ payload: id }, { select, call, put }) {
      const { data } = yield call(_deleteDs, id);
      yield put({ type: 'changeLoading', payload: 'add' })
      if (data) {
        yield put({ type: 'resetPageInfo' });
        yield put({ type: 'fetchDsList' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * fetchUsers(action, { select, put, call }) {
      const { data } = yield call(_fetchUsers);
      yield put({ type: 'changeLoading', payload: 'add' })
      if (data) {
        yield put({ type: 'setUsers', payload: data })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * tranferUser({ payload }, { select, call, put }) {
      const { currentTransferId } = yield select(state => state.dsList);
      yield put({ type: 'changeLoading', payload: 'add' })
      const { data } = yield call(_tranferUser, payload, currentTransferId)
      if (data) {
        yield put({ type: 'fetchDsList' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * confirmSync({ payload: id }, { select, call, put }) {
      const { data } = yield call(_confirmSync, id)
      yield put({ type: 'changeLoading', payload: 'add' })
      if (data && data.success) {
        yield put({ type: 'fetchDsList' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * startSync({ payload }, { select, call, put }) { //5001
      const { id, type } = payload
      yield put({ type: 'changeLoading', payload: 'add' })
      const { data } = yield call(_startSync, id, { sync_now: type })
      if (data && data.success) {
        yield put({ type: 'fetchDsList' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * stopSync({ payload: dataSourceId }, { select, call, put }) { //5001
      const { data } = yield call(_stopSync, dataSourceId)
      yield put({ type: 'changeLoading', payload: 'add' })
      if (data && data.success) {
        yield put({ type: 'fetchDsList' })
      }
      yield put({ type: 'changeLoading', payload: 'sub' })
    },
    * batchSync(action, { select, call, put }) {
      const { canSync } = yield select(state => state.dsList)
      const { data, err } = yield call(_batchSync, { ds_ids: canSync })
      if (data) {
        yield put({ type: 'currentUser/changeStatus' })
        yield put({ type: 'dsList/fetchDsList' })
      }
    }
  },

  reducers: {
    changeLoading(state, { payload }) {
      return {
        ...state,
        loadingCount: payload === 'add' ? state.loadingCount + 1 : state.loadingCount - 1
      }
    },
    saveDsList(state, { payload }) {
      return {
        ...state,
        list: { ...state.list, ...payload }
      }
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
    },
    resetPageInfo(state) {
      return { ...state, pageInfo: { page: 1, pageSize: 20 } }
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
    setCurrentTransferId(state, { payload: id }) {
      return { ...state, currentTransferId: id }
    },
    setMeta(state, { payload }) {
      return { ...state, meta: payload }
    },
    clearState(state) {
      return {
        ...state,
        list: [],
        pageInfo: {
          page: 1,
          pageSize: 12
        },
        canSync: [],
        users: [],
        groups: [],
        transferModalVisible: false,
        currentTransferId: null,
        meta: null,
        loadingCount: 0
      }
    },
    setSyncStatus(state, { payload }) {
      return {
        ...state,
        syncStatus: payload
      }
    }
  }
}