import React from 'react';
import { connect } from 'dva'
import _ from 'lodash'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { routerRedux } from 'dva/router'
import Footer from '../Upload/Footer'
import DsListItem from './DsListItem'
import styles from './index.less';

const DsList = ({ dsList, dispatch, currentUser }) => {
  const canSync = _.get(dsList, 'canSync', [])
  const firstLogin = _.get(currentUser, 'firstLogin')
  const list = _.get(dsList, 'list', [])
  const changeCanSync = (id) => {
    dispatch({ type: 'dsList/changeCanSync', payload: id })
  }
  const toDetail = (id) => {
    dispatch(routerRedux.push(`/dsDetail/${id}`))
  }
  const toEdit = (id) => {
    dispatch(routerRedux.push(`/ds/edit/${id}`))
  }
  const getDsList = () => {
    return _.map(list, (listItem, index) => {
      const id = _.get(listItem, 'id')
      const checked = canSync.includes(id);
      return (
        <DsListItem
          key={index}
          data={listItem}
          firstLogin={firstLogin}
          checked={checked}
          changeCanSync={changeCanSync}
          toDetail={toDetail}
          toEdit={toEdit}
        />
      )
    })
  }
  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.content}
        style={{ height: firstLogin === 1 ? 'calc(100% - 50px)' : '100%' }}
      >
        {getDsList()}
        <button
          className={styles.loadmore}
          style={{ display: firstLogin === 0 ? 'block' : 'none' }}
          onClick={() => {
            dispatch({ type: 'dsList/loadmore' });
            dispatch({ type: 'dsList/fetchDsList' })
          }}
        >
          加载更多
        </button>
        <div
          className={styles.deadline}
          style={{ display: firstLogin === 0 ? 'block' : 'none' }}
        >
          <div className={styles.divider} />我是有底线的 <div className={styles.divider}/>
        </div>
      </div>
      <div
        className={styles.footer}
        style={{ display: firstLogin === 1 ? 'block' : 'none' }}
      >
        <Footer
          text1="跳过"
          text2="开始同步"
          click1={() => {
            console.log('11111111111')
            dispatch({ type: 'currentUser/changeStatus' })
            dispatch({ type: 'dsList/fetchDsList' })
          }}
          click2={() => {
            dispatch({ type: 'currentUser/changeStatus' })
            dispatch({ type: 'dsList/fetchDsList' })
          }}
        />
      </div>
    </div>
  )
}

const mapStateToProps = ({ dsList, currentUser }) => ({
  dsList, currentUser
})

export default connect(mapStateToProps)(DsList)