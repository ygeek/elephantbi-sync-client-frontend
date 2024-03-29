import React from 'react';
import { connect } from 'dva';
import { Dropdown, Menu } from 'antd'
import { routerRedux } from 'dva/router'
import defaultAvatar from 'assets/defaultAvatar.jpg'
import { WEBSOCKETURL, AVATAR_URL } from 'constants/APIConstants'
import Websocket from 'react-websocket';
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
  const handleSocket = (data) => {
    const jsonData = JSON.parse(data)
    if (_.get(jsonData, 'msg_title') === 'SYNC_PROGRESS') { // 数据源同步时间
      dispatch({ type: 'dsDetail/setSyncTime', payload: jsonData })
      return
    }
    if (_.get(jsonData, 'msg_title') === 'SYNC_STATUS') { // 数据源同步状态
      dispatch({ type: 'dsDetail/setSyncStatus', payload: jsonData })
      dispatch({ type: 'dsList/setSyncStatus', payload: jsonData })
      return
    }
  }
  return (
    <div
      className={styles.container}
      style={{ display: _.get(currentUser, 'firstLogin', 1) === 0 ? 'block' : 'none' }}
    >
      <Websocket
        url={WEBSOCKETURL(currentUser.id)}
        onMessage={handleSocket}
      />
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
            <img
              className={styles.avatar}
              alt="" src={_.get(currentUser, 'avatar') ? `${AVATAR_URL}${currentUser.avatar}` : defaultAvatar}
              onError={(e) => {
                const target = e.currentTarget
                target.src = defaultAvatar
              }}
            />   
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