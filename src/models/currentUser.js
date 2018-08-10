import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'currentUser',

  state: {
    firstLogin: 1,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/(.*)').exec(pathname)
        if (match) {
        }
      })
    }
  },

  effects: {

  },

  reducers: {
    changeStatus(state) {
      return { ...state, firstLogin: 0 }
    }
  }
}