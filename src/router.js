import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import _ from 'lodash'

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

  const DsEdit = creatDynamic({
    component: () => import('./routes/DsEdit'),
    models: () => [import('./models/dsEdit')]
  })

  const DsList = creatDynamic({
    component: () => import('./routes/DsList'),
    models: () => [import('./models/dsList')]
  })

  const Login = creatDynamic({
    component: () => import('./routes/Login'),
    models: () => [import('./models/login')]
  })

  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/login"
          component={() => {
            if (!_.get(app._store.getState().currentUser, 'id', null)) {
              return (<Redirect to="/login" />)
            }
            return <Redirect to="/" />
          }}
        />
        <Route path="/" component={() => {
          if (!_.get(app._store.getState().currentUser, 'id', null)) {
            return (<Redirect to="/login" />)
          }
          return (
            <Layout>
              <Switch>
                <Route exact path="/" component={() => {
                  return <Redirect to="/dataSource/list" />
                }} />
                <Route path="/dataSource/list" component={DsList} />
                <Route path="/selectDatabase" component={SelectDatabase} />
                <Route path="/dsDetail/:id" component={DsDetail} />
                <Route path="/ds/edit/:id" component={DsEdit} />
                <Route path="/database" component={Database} />
              </Switch>
            </Layout>
          )
        }} />
      </Switch>
    </Router>
  )
}

export default RouterConfig;
