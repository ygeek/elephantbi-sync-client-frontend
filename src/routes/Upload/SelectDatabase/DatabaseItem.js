import React from 'react';
import checkIcon from 'assets/checked.png'
import styles from './index.less';

const DatabaseItem = ({ data, click, checked }) => {
  return (
    <button
      className={styles.databaseItem}
      onClick={click}
    >
      <img className={styles.logo} alt={data.name} src={data.logo} />
      <div className={styles.name}>{data.name}</div>
      <img className={styles.checked} alt="" src={checkIcon} style={{ display: checked ? 'block': 'none' }} />
    </button>
  )
}

export default DatabaseItem