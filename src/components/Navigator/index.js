import React from 'react';
import { connect } from 'dva';
import { Dropdown, Menu } from 'antd'
import { routerRedux } from 'dva/router'
import avatar from 'assets/avatar.jpg'
import _ from 'lodash'
import styles from './index.less';

const MenuItem = Menu.Item

const Navigator = ({ dispatch, currentUser }) => {
  const clickMenu = ({ key }) => {
    switch (key) {
      case 'logout':
        dispatch({ type: 'currentUser/logOut' })
      default:
        break;
    }
  }
  const menu = (
    <Menu onClick={clickMenu}>
      <MenuItem key="logout">登出</MenuItem>
    </Menu>
  )
  return (
    <div className={styles.container}>
      <button
        className={`${styles.logo} ${styles.click}`}
        onClick={() => {
          dispatch(routerRedux.push('/'))
        }}
      />
      <button
        className={`${styles.ds} ${styles.click}`}
        onClick={() => {
          dispatch(routerRedux.push('/dataSource/list'))
        }}
      >
        我的数据源
      </button>
      <div className={styles.right}>
        <button
          className={`${styles.click}`}
          onClick={() => {
            dispatch(routerRedux.push('/selectDatabase'))
          }}
        >
          新增数据源
        </button>
        <Dropdown overlay={menu} >
          <span>
            <img className={styles.avatar} alt="" src={avatar} />   
            <span className={styles.name}>{_.get(currentUser, 'name')}</span>
          </span>
        </Dropdown>
      </div>
    </div>
  )
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
})

export default connect(mapStateToProps)(Navigator)