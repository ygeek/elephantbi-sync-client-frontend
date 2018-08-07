import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'upload',

  state: {
    sourceType: null,
  },

  subscriptions: {
    selectDatabase({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;
        const match = pathToRegexp('/selectDatabase').exec(pathname);
        if (match) {
        }
      })
    }
  },

  effects: {
    
  },

  reducers: {
    setSourceType(state, { payload }) {
      return { ...state, sourceType: payload }
    }
  }
}