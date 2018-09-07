import React from 'react';
import { connect } from 'dva'
import Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
import _ from 'lodash'
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import BasicInformation from './content/BasicInformation'
import AccountInformation from './content/AccountInformation'
import SynchronizationCycle from './content/SynchronizationCycle'
import SynchronousMode from './content/SynchronousMode'
import Footer from '../Upload/Footer'
import styles from './index.less';

const DsEdit = ({ dsEdit, dispatch, form }) => {
  const { TabPane } = Tabs
  const dataSource = _.get(dsEdit, 'dataSource')
  const sourceType = _.get(dataSource, 'source_type')
  const dsName = _.get(dataSource, 'name')
  const description = _.get(dataSource, 'description')
  const tableNames = _.get(dsEdit, 'tableNames')
  const host = _.get(dataSource, 'database.host')
  const port = _.get(dataSource, 'database.port')
  const dbName = _.get(dataSource, 'database.name')
  const username = _.get(dataSource, 'database.username')
  const syncInfo = _.get(dsEdit, 'sublimeData.syncInfo')
  const tableToColumns = _.get(dsEdit, 'tableToColumns')
  const syncMode = _.get(dsEdit, 'sublimeData.syncMode')
  const changeSyncInfo = (params) => {
    dispatch({ type: 'dsEdit/changeSyncInfo', payload: params })
  }

  const changeSchedule = (params) => {
    dispatch({ type: 'dsEdit/changeSchedule', payload: params })
  }

  const changeSyncMode = (name, params) => {
    dispatch({ type: 'dbEdit/changeSyncMode', payload: { name, params } })
  }
  const config = [
    {
      title: '基本信息',
      key: 'basic',
      component: (
        <BasicInformation
          form={form}
          sourceType={sourceType}
          name={dsName}
          description={description}
          tableNames={tableNames}
        />
      )
    }, {
      title: '帐户信息',
      key: 'account',
      component: (
        <AccountInformation
          form={form}
          host={host}
          port={port}
          dbName={dbName}
          username={username}
        />
      )
    }, {
      title: '同步周期',
      key: 'cycle',
      component: (
        <SynchronizationCycle
          syncInfo={syncInfo}
          changeSyncInfo={changeSyncInfo}
          changeSchedule={changeSchedule}
        />
      )
    }, {
      title: '同步模式',
      key: 'mode',
      component: (
        <SynchronousMode
          tableNames={tableNames}
          tableToColumns={tableToColumns}
          syncMode={syncMode}
          changeSyncMode={changeSyncMode}
        />
      )
    }
  ]
  const getTabPanes = (config) => {
    return _.map(config, (item) => {
      return (
        <TabPane tab={item.title} key={item.key} >
          {item.component}
        </TabPane>
      )
    })
  }
  const onSubmit = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        
      }
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>编辑数据源</div>
          <Tabs>
            {
              getTabPanes(config)
            }
          </Tabs>
        </div>
      </div>
      <Footer
        text1="取消"
        text2="保存"
        click1={() => {}}
        click2={() => {
          onSubmit()
        }}
      />
    </div>
  )
}

const mapStateToProps = ({ dsEdit }) => ({
  dsEdit
})

export default connect(mapStateToProps)(Form.create()(DsEdit))

