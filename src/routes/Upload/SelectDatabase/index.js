import React from 'react'
import { connect } from 'dva';
import _ from 'lodash';
import Modal from 'antd/lib/modal'
import 'antd/lib/modal/style/css'
import { routerRedux } from 'dva/router';
import DatabaseItem from './DatabaseItem'
import { databaseConfig } from './config';
import Footer from '../Footer';
import styles from './index.less';


class SelectDatabase extends React.Component {
  render() {
    const { dispatch, upload } = this.props;
    const dbType = _.get(upload, 'dbType')
    const sourceType = _.get(upload, 'sourceType')
    const renderItems = (list) => {
      return list.map((item, index) => {
        const type = _.get(item, 'db_type')
        const sourceType = _.get(item, 'source_type')
        const click = () => {
          dispatch({ type: 'upload/setDbType', payload: type })
          dispatch({ type: 'upload/setSourceType', payload: sourceType })
        }       
        return (
          <DatabaseItem
            key={index}
            data={item}
            click={click}
            checked={dbType === type}
          />
        )
      })
    }
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <header>请选择数据库</header>
            <div className={styles.database}>
              {renderItems(databaseConfig)}
            </div>
          </div>
        </div>
        <Footer
          text1="取消"
          text2="建立连接"
          click1={() => {
            dispatch(routerRedux.push('/'))
          }}
          click2={() => {
            if (sourceType === null) {
              Modal.warning({
                title: '选择数据库',
                content: '请选择一种数据库',
                okText: '确认'
              })
              return;
            }
            dispatch(routerRedux.push({
              pathname: '/database',
              search: `dbType=${dbType}&sourceType=${sourceType}`
            }))
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ upload }) => ({
  upload
});

export default connect(mapStateToProps)(SelectDatabase)