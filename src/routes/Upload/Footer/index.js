import React from 'react';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css'
import styles from './index.less'

const Footer = ({
  text1,
  text2,
  click1,
  click2
}) => {
  return (
    <div className={styles.container}>
      <Button
        onClick={click1}
      >
        {text1}
      </Button>
      <Button
        onClick={click2}
        type="primary"
      >
        {text2}
      </Button>
    </div>
  )
}

export default Footer;