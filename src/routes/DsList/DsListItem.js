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
import confirmModal from 'components/ConfirmModal'
import 'antd/lib/modal/style/css'
import { syncStatusMap, dslistMap, menuConfig, isDataBase, isSyncing } from '../config'
import { databaseConfig } from '../Upload/SelectDatabase/config'
import styles from './index.less'

const DsListItem = ({
  data,
  firstLogin,
  checked,
  changeCanSync,
  toDetail,
  toEdit,
  showTransfer,
  deleteDs,
  startSync,
  stopSync,
  confirmSync
}) => {
  const MenuItem = Menu.Item
  const sourceType = _.get(data, 'source_type')
  const syncStatus = _.get(data, 'sync_status')
  const showModal = (method, id, type) => {
    confirmModal({
      title: '提示',
      content: '停止同步才能进行转让/编辑/删除数据源操作，是否停止转让并继续',
      okText: '停止并继续',
      type: 'warning',
      onOk() {
        stopSync(data.id)
        method(id, type);
      }
    })
  }
  const menuOnClick = ({ key }) => {
    switch (key) {
      case 'detail':
        toDetail(data.id);
        break;
      case 'edit':
        if (isDataBase(sourceType) && isSyncing(syncStatus)) {
          showModal(toEdit, data.id, sourceType)
        } else {
          toEdit(data.id, sourceType);
        }
        break;
      case 'delete':
        if (isDataBase(sourceType) && isSyncing(syncStatus)) {
          showModal(deleteDs, data.id, sourceType)
        } else {
          deleteDs(data.id)
        }
        break;
      case 'transfer':
        if (isDataBase(sourceType) && isSyncing(syncStatus)) {
          showModal(showTransfer, data.id, sourceType)
        } else {
          showTransfer(data.id)
        }
        break;
      case 'trigger':
        confirmModal({
          title: '立即触发同步',
          content: '立即触发同步后，将重新同步此数据源，是否开始同步',
          okText: '确认',
          onOk() {
            startSync(data.id, 1)
          },
          type: 'info'
        })
        break;
      case 'start':
        confirmModal({
          title: '开启同步',
          content: '开启同步后，将根据您的时间设定，定期同步数据，是否确定开启同步',
          okText: '确认',
          onOk() {
            startSync(data.id, 0)
          },
          type: 'info'
        })
        break;
      case 'confirm':
        confirmSync(data.id)
        break;
      case 'stop':
        confirmModal({
          title: '停止同步',
          content: '停止同步后数据将离线，需要再次手动触发同步，是否继续停止同步',
          okText: '确认',
          onOk() {
            stopSync(data.id)
          },
          type: 'info'
        })
        break;
      default:
        break;
    }
  }
  const menu = (
    <Menu onClick={menuOnClick}>
      {
        menuConfig(syncStatus, 'list', sourceType).map(item => (
          <MenuItem key={item.key} style={{ display: item.auth ? 'block' : 'none' }}>{item.title}</MenuItem>
        ))
      }
    </Menu>
  )
  return (
    <div className={styles.dsListItem}>
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <img alt="" src={dslistMap[`${data.source_type}`].icon} className={styles.typeIcon} />
          <div className={styles.infoDetail}>
            <div className={styles.name}>{_.get(data, 'name')}</div>
            <div className={styles.description}>{`${dslistMap[_.get(data, 'source_type')]['name']} - 客户端连接`}</div>
          </div>
        </div>
        <div className={styles.dataInfo}>
          <div className={styles.infoItem}>
            <div className={styles.infoTitle}>工作表</div>
            <div className={styles.infoContent}>{`${_.get(data, 'worksheet_count', 0)}个`}</div>
          </div>
          <div className={styles.infoItem}>
            <div className={styles.infoTitle}>行数</div>
            <div className={styles.infoContent}>{`${_.get(data, 'size', 0)}行`}</div>
          </div>
          <div className={styles.infoItem} style={{ width: '120px' }}>
            <div className={styles.infoTitle}>最近更新</div>
            <div className={styles.infoContent}>{moment(_.get(data, 'updated_at')).format('YYYY/MM/DD HH:mm:ss')}</div>
          </div>
          <div className={styles.syncInfoItem}>
            <img alt="" src={syncStatusMap[_.get(data, 'sync_status')].icon} />
            <div className={styles.syncInfoTitle}>同步状态</div>
            <div className={styles.syncInfoContent}>{syncStatusMap[_.get(data, 'sync_status')].name}</div>
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