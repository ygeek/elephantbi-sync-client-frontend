import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './global.css';

const app = dva({
  history: createHistory(),
});

[].forEach((fileName) => {
  app.model(require(`./models/${fileName}.js`).default);
});

app.router(require('./router').default);

app.start('#root');