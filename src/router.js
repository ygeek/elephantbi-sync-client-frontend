import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

const RouterConfig = ({ history, app }) => {

  const creatDynamic = props => dynamic({
    ...props,
    app
  });

  const Layout = creatDynamic({
    component: () => import('./routes/Layout')
  })

  const SelectDatabase = creatDynamic({
    component: () => import('./routes/Upload/SelectDatabase'),
    models: () => [import('./models/upload')]
  })

  const Database = creatDynamic({
    component: () => import('./routes/Upload/Database'),
    models: () => [import('./models/upload')]
  })

  const DsDetail = creatDynamic({
    component: () => import('./routes/DsDetail'),
    models: () => [import('./models/dsDetail')]
  })

  return (
    <Router history={history}>
      <Route path="/" component={() => {
        return (
          <Layout>
            <Switch>
              <Route exact path="/" component={() => {
                return <div />
              }} />
              <Route path="/selectDatabase" component={SelectDatabase} />
              <Route path="/dsDetail/:id" component={DsDetail} />
              <Route path="/database" component={Database} />
            </Switch>
          </Layout>
        )
      }} />
    </Router>
  )
}

export default RouterConfig;
