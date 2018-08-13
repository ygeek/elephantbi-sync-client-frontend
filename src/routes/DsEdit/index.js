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
  const config = [
    {
      title: '基本信息',
      key: 'basic',
      component: (
        <BasicInformation
          form={form}
        />
      )
    }, {
      title: '帐户信息',
      key: 'account',
      component: (
        <AccountInformation
          form={form}
        />
      )
    }, {
      title: '同步周期',
      key: 'cycle',
      component: (
        <SynchronizationCycle
          modelState={dsEdit}
          dispatch={dispatch}
        />
      )
    }, {
      title: '同步模式',
      key: 'mode',
      component: <SynchronousMode />
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

