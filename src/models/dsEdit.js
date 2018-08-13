import pathToRegexp from 'path-to-regexp';

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
       }
     })
    }
  },

  effects: {

  },

  reducers: {
    saveDsId(state, { payload }) {
      return { ...state, dsId: payload }
    },
    changeSyncCycle(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}