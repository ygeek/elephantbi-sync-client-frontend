import React from 'react';
import _ from 'lodash'
import moment from 'moment'
import Checkbox from 'antd/lib/checkbox'
import 'antd/lib/checkbox/style/css';
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import Dropdown from 'antd/lib/dropdown'
import 'antd/lib/dropdown/style/css'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import { syncStatus } from '../config'
import { databaseConfig } from '../Upload/SelectDatabase/config'
import styles from './index.less'

const DsListItem = ({
  data,
  firstLogin,
  checked,
  changeCanSync,
  toDetail,
  toEdit
}) => {
  const MenuItem = Menu.Item
  const menuOnClick = ({ key }) => {
    switch(key) {
      case 'detail':
        toDetail(data.id);
        break;
      case 'edit':
        toEdit(data.id);
        break;
      default:
        break;
    }
  }
  const menu = (
    <Menu onClick={menuOnClick}>
      <MenuItem key="detail">查看详细信息</MenuItem>
      {
        [2, 4, 5].includes(data.client) ? (
          <MenuItem key="trigger">立即触发同步</MenuItem>
        ) : null
      }
      {
        [2, 4, 5, 3].includes(data.client) ? (
          <MenuItem key="stop">停止同步</MenuItem>
        ) : null
      }
      {
        [0].includes(data.client) ? (
          <MenuItem key="start">开始同步</MenuItem>
        ) : null
      }
      {
        [1].includes(data.client) ? (
          <MenuItem key="confirm">同步确认</MenuItem>
        ) : null
      }
      <MenuItem key="edit">编辑</MenuItem>
      <MenuItem key="transfer">转让</MenuItem>
      <MenuItem key="delete">删除</MenuItem>
    </Menu>
  )
  return (
    <div className={styles.dsListItem}>
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <img alt="" src={null} className={styles.typeIcon} />
          <div className={styles.infoDetail}>
            <div className={styles.name}>{_.get(data, 'name')}</div>
            <div className={styles.description}>{`${databaseConfig[_.get(data, 'source_type')]['name']} - 客户端连接`}</div>
          </div>
        </div>
        <div className={styles.dataInfo}>
          <div className={styles.infoItem}>
            <div className={styles.infoTitle}>工作表</div>
            <div className={styles.infoContent}>{`${_.get(data, 'charts_count', 0)}个`}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoTitle}>行数</div>
            <div className={styles.infoContent}>{`${_.get(data, 'size', 0)}行`}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoTitle}>最近更新</div>
            <div className={styles.infoContent}>{moment(_.get(data, 'update_at')).format('YYYY/MM/DD HH:mm:ss')}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoTitle}>同步状态</div>
            <div className={styles.infoContent}>{syncStatus[_.get(data, 'sync_status')]}</div>
          </div>
        </div>
        <button
          className={styles.clientSign}
          style={{ display: data.client === 1 ? 'none' : 'block' }}
        >
          其他客户端
        </button>
        {
          firstLogin === 1 ? (
            <Checkbox
              checked={checked}
              className={styles.checkBox}
              onChange={(checked) => {
                if (data.client === 1) {
                  changeCanSync(data.id)
                }
              }}
            />
          ) : (
              <Dropdown
                overlay={menu}
                trigger={['click']}
              >
                <Icon type="ellipsis" className={styles.operate} />
              </Dropdown>
            )
        }
      </div>
    </div>
  )
}

export default DsListItem;