import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './global.css';

const getInitialState = () => {
  return localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
}

const app = dva({
  history: createHistory(),
  initialState: getInitialState()
});

app.use({
  onStateChange: () => {
    const state = app._store.getState();
    const { currentUser } = state;

    localStorage.setItem('reduxState', JSON.stringify({
      currentUser
    }));
  }
});

[
  'currentUser'
].forEach((fileName) => {
  app.model(require(`./models/${fileName}.js`).default);
});

app.router(require('./router').default);

app.start('#root');