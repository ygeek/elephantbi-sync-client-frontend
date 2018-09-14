import React, { Component } from 'react'
import { Modal } from 'antd'
import success from './assets/success.png'
import info from './assets/info.png'
import warning from './assets/warning.png'
import danger from './assets/danger.png'
import styles from './index.less'

const confirmModal = ({
  title,
  content,
  onOk,
  okText,
  type,
  buttonNum = 2
}) => {
  const getType = () => {
    switch (type) {
      case 'success':
        return success;
      case 'info':
        return info;
      case 'warning':
        return warning;
      case 'danger':
        return danger;
      default:
        return success
    }
  }
  if (buttonNum === 1) {
    Modal.confirm({
      title: <div><img alt="" src={getType()} />{title}</div>,
      content,
      width: 400,
      onOk,
      okText,
      cancelText: '取消',
      className: `${styles.kownModal}`
    })
    return
  }
  Modal.confirm({
    title: <div><img alt="" src={getType()} />{title}</div>,
    content,
    width: 400,
    onOk,
    okText,
    cancelText: '取消',
    className: `${styles.confirmModal}`
  })
}

export default confirmModal
