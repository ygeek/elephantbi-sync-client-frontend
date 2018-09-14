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
  _confirmSync
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
    meta: null
  },

  subscriptions: {
    setup({ dispatch, history }) {
     history.listen((location) => {
       const { pathname } = location;
       const match = pathToRegexp('/dataSource/list').exec(pathname)
       if (match) {
         dispatch({ type: 'checkStatus' })
         dispatch({ type: 'fetchUsers' })
       }
     })
    }
  },

  effects: {
    * checkStatus(action, { select, call, put }) {
      const { firstLogin } = yield select(state => state.currentUser)
      yield put({ type: 'fetchDsList' })
    },
    * fetchAllDsList(action, { select, call, put }) { //5001
      const { data } = yield call(_fetchDsList, { all: 1 });
      if (data && data.status >= 200 && data.status < 300) {
        const dsList = _.get(data, 'data.list', [])
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
    * fetchDsList(action, { select, call, put }) { //5001
      const { pageInfo } = yield select(state => state.dsList)
      const { data } = yield call(_fetchDsList, {
        page: pageInfo.page,
        page_size: pageInfo.pageSize
      });
      if (data && data.status >= 200 && data.status < 300) {
        const dsList = _.get(data, 'data.list', [])
        yield put({ type: 'saveDsList', payload: { [data.data.meta.current_page]: dsList} })
        yield put({ type: 'setMeta', payload: data.meta })
      }
    },
    * deleteDs({ payload: id }, { select, call, put }) {
      const { data } = yield call(_deleteDs, id);
      if (data) {
        yield put({ type: 'resetPageInfo' });
        yield put({ type: 'fetchDsList' })
      }
    },
    * fetchUsers(action, { select, put, call }) {
      const { data } = yield call(_fetchUsers);
      if (data) {
        yield put({ type: 'setUsers', payload: data })
      }
    },
    * tranferUser({ payload }, { select, call, put }) {
      const { currentTransferId } = yield select(state => state.dsList);
      const { data } = yield call(_tranferUser, payload, currentTransferId)
      if (data) {
        yield put({ type: 'fetchDsList' })
      }
    },
    * confirmSync({ payload: id }, { select, call, put }) {
      const { data } = yield call(_confirmSync, id)
      if (data && data.success) {
        yield put({ type: 'fetchDsList' })
      }
    },
    * startSync({ payload }, { select, call, put }) { //5001
      const { id, type } = payload
      const { data } = yield call(_startSync, id, { sync_now: type })
      if (data && data.success) {
        yield put({ type: 'fetchDsList' })
      }
    },
    * stopSync({ payload: dataSourceId }, { select, call, put }) { //5001
      const { data } = yield call(_stopSync, dataSourceId)
      if (data && data.success) {
        yield put({ type: 'fetchDsList' })
      }
    }
  },

  reducers: {
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
    }
  }
}