import React from 'react';
import { connect } from 'dva'
import Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
import _ from 'lodash'
import BasicInformation from './content/BasicInformation'
import AccountInformation from './content/AccountInformation'
import SynchronizationCycle from './content/SynchronizationCycle'
import SynchronousMode from './content/SynchronousMode'
import Footer from '../Upload/Footer'
import styles from './index.less';

const DsEdit = () => {
  const { TabPane } = Tabs
  const config = [
    {
      title: '基本信息',
      key: 'basic',
      component: <BasicInformation />
    }, {
      title: '帐户信息',
      key: 'account',
      component: <AccountInformation />
    }, {
      title: '同步周期',
      key: 'cycle',
      component: <SynchronizationCycle />
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
        click2={() => {}}
      />
    </div>
  )
}

const mapStateToProps = ({ dsEdit }) => ({
  dsEdit
})

export default connect(mapStateToProps)(DsEdit)

