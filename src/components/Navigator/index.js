import React from 'react';
import { connect } from 'dva';
import logo from 'assets/logolong.png'
import avatar from 'assets/avatar.jpg'
import styles from './index.less';

const Navigator = () => {
  return (
    <div className={styles.container}>
      <button className={`${styles.logo} ${styles.click}`}>ElephantBI</button>
      <button className={`${styles.ds} ${styles.click}`}>我的数据源</button>
      <div className={styles.right}>
        <button className={`${styles.click}`}>新增数据源</button>
        <img className={styles.avatar} alt="" src={avatar} />
        <span className={styles.name}>王帅</span>
      </div>
    </div>
  )
}

export default connect()(Navigator)