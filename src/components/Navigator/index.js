import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import avatar from 'assets/avatar.jpg'
import styles from './index.less';

const Navigator = ({ dispatch }) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.logo} ${styles.click}`}
        onClick={() => {
          dispatch(routerRedux.push('/'))
        }}
      >
        ElephantBI
      </button>
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
        <img className={styles.avatar} alt="" src={avatar} />
        <span className={styles.name}>王帅</span>
      </div>
    </div>
  )
}

export default connect()(Navigator)