import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'dsEdit',

  state: {
    dsId: null,
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
  }
}