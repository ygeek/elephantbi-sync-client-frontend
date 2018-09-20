import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import { Spin, Tooltip } from 'antd'
import Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css';
import Dropdown from 'antd/lib/dropdown'
import 'antd/lib/dropdown/style/css'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import 'antd/lib/modal/style/css'
import tooltip from 'assets/tooltip.svg'
import Table from 'antd/lib/table'
import syncDefault from 'assets/syncDefault.svg'
import 'antd/lib/table/style/css'
import TransferModal from '../DsList/TransferModal'
import DataSourceTable from 'components/DataSourceTable'
import confirmModal from 'components/ConfirmModal'
import moment from 'moment'
import worksheet from 'assets/worksheet.png'
import sizeIcon from 'assets/size.png'
import { routerRedux } from 'dva/router'
import tooltipTitle from './tooltipTitle.js'
import { syncStatusMap, dslistMap, menuConfig, isDataBase, isSyncing } from '../config'
import styles from './index.less'

const DsDetail = ({ dsDetail, dispatch }) => {
  const { dsDetail: dataSource, activeKey, tableIds, dsId, dsLog, currentTable, loadingCount, syncTime } = dsDetail
  const currentColumns = _.get(currentTable, 'columns', [])
  const currentRecords = _.get(currentTable, 'records', [])
  const currentTableName = _.get(currentTable, 'table_name')
  const status = _.get(dataSource, 'status')
  const sourceType = _.get(dataSource, 'source_type')
  const syncStatus = _.get(dataSource, 'sync_status')
  const transferModalVisible = _.get(dsDetail, 'transferModalVisible', false)
  const users = _.get(dsDetail, 'users', [])
  const shareUserList = _.get(dataSource, 'shared_users_list', [])
  const shareGroupList = _.get(dataSource, 'shared_groups_list', [])
  const owner = _.get(dataSource, 'user', {})
  const processedRows = _.get(syncTime, 'processed_rows', 0)
  const totalRows = _.get(syncTime, 'total_rows', 1)
  const remaining = _.get(syncTime, 'remaining', -1)
  const { TabPane } = Tabs
  const changeColumns = (payload) => {
    dispatch({ type: 'dsDetail/changeColumns', payload })
  }
  const logTypeMap = {
    ADD: '新增',
    UPDATE: '更新'
  }
  const closeTransfer = () => {
    dispatch({ type: 'dsDetail/hideTransferModal' })
  }
  const historyColumn = [
    {
      title: '更新时间',
      key: 'created_at',
      dataIndex: 'created_at',
      render(text) {
        return `${moment(text).format('YYYY-MM-DD')} ${moment(text).format('HH:mm:ss')}`
      }
    },
    {
      title: '更新日志',
      key: 'content',
      dataIndex: 'content',
      render(text, record, index) {
        if (record.source_type === 0) {
          return `${logTypeMap[record.operation]} ${_.get(record, 'filename')}`
        }
        return `${logTypeMap[record.operation]} ${_.get(record, 'filename')} - ${_.get(record, 'table_name')}`
      }
    }
  ]
  const showModal = (method, id, type) => {
    confirmModal({
      title: '提示',
      content: '停止同步才能进行转让/编辑/删除数据源操作，是否停止转让并继续',
      okText: '停止并继续',
      type: 'warning',
      onOk() {
        method(id, type);
      }
    })
  }
  const deleteDs = () => {
    confirmModal({
      title: '删除数据源',
      content: '若删除数据源，关联的工作表与卡片将一并删除，是否确认删除？',
      onOk() {
        dispatch({ type: 'dsDetail/deleteDataSource' })
      },
      okText: '删除',
      type: 'danger'
    })
  }
  const showTransferModal = () => {
    dispatch({ type: 'dsDetail/showTransferModal' })
  }
  const historyRecord = (
    <Table
      columns={historyColumn}
      dataSource={dsLog}
      pagination={false}
      className={styles.logTable}
    />
  )
  const toEdit = (id) => {
    dispatch(routerRedux.push(`/ds/edit/${id}`))
  }
  const startSync = () => {
    dispatch({ type: 'dsDetail/startSync', payload: 0 });
  }

  const stopSync = () => {
    dispatch({ type: 'dsDetail/stopSync' });
  }

  const confirmSync = () => {
    dispatch({ type: 'dsDetail/confirmSync' })
  }

  const trigger = () => {
    dispatch({ type: 'dsDetail/startSync', payload: 1 })
  }
  const MenuItem = Menu.Item
  const clickMenu = ({ key }) => {
    switch (key) {
      case 'delete':
        if (isDataBase(sourceType) && isSyncing(syncStatus)) {
          showModal(deleteDs)
        } else {
          deleteDs()
        }
        break;
      case 'transfer':
        if (isDataBase(sourceType) && isSyncing(syncStatus)) {
          showModal(showTransferModal)
        } else {
          showTransferModal()
        }
        break;
      case 'edit':
        toEdit(dsId, sourceType)
        break;
      case 'trigger':
        trigger()
        break;
      case 'start':
        startSync()
        break;
      case 'confirm':
        confirmSync()
        break;
      case 'stop':
        confirmModal({
          title: '停止同步',
          content: '停止同步后数据将离线，需要再次手动触发同步，是否继续停止同步',
          okText: '确认',
          onOk() {
            stopSync()
          },
          type: 'info'
        })
        break;
      default:
        break;
    }
  }
  const menu = (
    <Menu onClick={clickMenu}>
      {
        menuConfig(syncStatus, 'detail', sourceType).map(item => (
          <MenuItem key={item.key} style={{ display: item.auth ? 'block' : 'none' }}>{item.title}</MenuItem>
        ))
      }
    </Menu>
  )
  const changeActiveKey = (key) => {
    dispatch({ type: 'dsDetail/changeActiveKey', payload: key })
    dispatch({ type: 'dsDetail/fetchDsLog' })
    dispatch({ type: 'dsDetail/fetchDsDetail' })
  }
  const transferOwner = (params) => {
    const { user_id: userID } = params
    confirmModal({
      title: '转让数据源',
      content: `将数据源转让给${_.get(_.find(users, { id: parseInt(userID, 10) }), 'name')}后，你将不再有此数据源的任何权限，是否确认操作`,
      onOk() {
        dispatch({ type: 'dsDetail/tranferUser', payload: params })
      },
      okText: '确认',
      cancelText: '取消',
      type: 'warning'
    })
  }
  const formatTooltipTitle = () => {
    return tooltipTitle({
      status,
      syncStatus,
      startSync,
      stopSync,
      confirmSync,
      trigger
    })
  }
  const formatSeconds = (value) => {
    let theTime = parseInt(value, 10);// 秒

    let theTime1 = 0;// 分

    let theTime2 = 0;// 小时

    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60, 10);

      theTime = parseInt(theTime % 60, 10);

      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60, 10);

        theTime1 = parseInt(theTime1 % 60, 10);
      }
    }

    const formatSeconds = parseInt(theTime, 10) >= 10 ? parseInt(theTime, 10) : `0${parseInt(theTime, 10)}`;
    let result = `00:00:${formatSeconds}`
    if (theTime1 > 0) {
      const formatMinutes = parseInt(theTime1, 10) >= 10 ? parseInt(theTime1, 10) : `0${parseInt(theTime1, 10)}`
      result = `00:${formatMinutes}:${formatSeconds}`;
    }

    if (theTime2 > 0) {
      const formatMinutes = parseInt(theTime1, 10) >= 10 ? parseInt(theTime1, 10) : `0${parseInt(theTime1, 10)}`
      const formatHours = parseInt(theTime2, 10) >= 10 ? parseInt(theTime2, 10) : `0${parseInt(theTime2, 10)}`
      result = `${formatHours}:${formatMinutes}${formatSeconds}`;
    }

    return result;
  }
  const getSyncTimeContent = () => {
    if (remaining === -1) {
      return (
        <div className={styles.timeSync}>
          <span className={styles.noTime} />
          <span className={styles.noTime} />
          <span>:</span>
          <span className={styles.noTime} />
          <span className={styles.noTime} />
          <span>:</span>
          <span className={styles.noTime} />
          <span className={styles.noTime} />
        </div>
      )
    }
    return formatSeconds(remaining)
  }
  const getDataTable = () => {
    if (syncStatus === 2 && status === 0) {
      return (
        <div className={styles.syncDefault}>
          <img alt="" src={syncDefault} />
          <div>正在等待同步，请稍作等待。您也可以点击<a href="javascript:void(0)" onClick={trigger}>立即触发同步</a>，将即刻同步此数据源</div>
        </div>
      )
    }
    if (syncStatus === 3 && status === 0) {
      return (
        <div className={styles.syncDefault}>
          <img alt="" src={syncDefault} />
          <div>数据正在同步中，请稍后查看数据，同步完成后，将会给您发送消息</div>
        </div>
      )
    }
    if (syncStatus === 6 && status === 0) {
      return (
        <div className={styles.syncDefault}>
          <img alt="" src={syncDefault} />
          <div>同步发生异常，稍后会重新自动进行数据同步，请稍后查看。您也可以点击<a href="javascript:void(0)" onClick={trigger}>立即触发同步</a>，将立即开始同步</div>
        </div>
      )
    }
    if (syncStatus === 5 && status === 0) {
      return (
        <div className={styles.syncDefault}>
          <img alt="" src={syncDefault} />
          <div>同步已失败，如若需要重新进行，您可以点击<a href="javascript:void(0)" onClick={startSync}>开启同步</a>，重新进行同步</div>
        </div>
      )
    }
    if (syncStatus === 0 && status === 0) {
      return (
        <div className={styles.syncDefault}>
          <img alt="" src={syncDefault} />
          <div>已离线同步，如若需要重新进行，请点击<a href="javascript:void(0)" onClick={startSync}>开启同步</a>，重新进行连接</div>
        </div>
      )
    }
    return (
      <DataSourceTable
        columns={currentColumns}
        dataSource={currentRecords}
        tableName={currentTableName}
        tableToColumns={currentColumns}
        changeTableToColumns={changeColumns}
      />
    )
  }
  return (
    <Spin spinning={loadingCount > 0}>
      <div className={styles.dsDetail}>
        <div className={styles.topColumn}>
          <div className={styles.title}>
            <div className={styles.leftTitle}>
              {
                _.get(dataSource, 'source_type') ? (
                  <img src={_.get(dslistMap, `${sourceType}.icon`)} alt="" />
                ) : null
              }
              <span>{_.get(dataSource, 'name')}</span>
            </div>
            <div className={styles.operate}>
              <Dropdown
              overlay={menu}
              >
                <Icon type="ellipsis" />
              </Dropdown>
            </div>
          </div>
          <div className={styles.remark}>
            {_.get(dataSource, 'description')}
          </div>
          <div className={styles.dataInfo}>
            <span className={styles.infoItem}>
              <img alt="" src={worksheet} className={styles.infoImg} />
              <div className={styles.info}>
                <div className={styles.infoTitle}>工作表</div>
                <div className={styles.infoContent}>{_.get(dataSource, 'worksheet_count', 0)}个</div>
              </div>
            </span>
            <span className={styles.infoItem}>
              <img alt="" src={sizeIcon} className={styles.infoImg} />
              <div className={styles.info}>
                <div className={styles.infoTitle}>行数</div>
                <div className={styles.infoContent}>{_.get(dataSource, 'size', 0)}行</div>
              </div>
            </span>
            <span className={styles.infoItem}>
              <div className={styles.info}>
                <div className={styles.infoTitle}>数据源类型</div>
                <div className={styles.infoContent}>{_.get(dslistMap, `${sourceType}.name`)}-客户端连接</div>
              </div>
            </span>
            <span className={styles.infoItem}>
              <div className={styles.info}>
                <div className={styles.infoTitle}>最近更新</div>
                <div className={styles.infoContent}>{moment(_.get(dataSource, 'updated_at')).format('YYYY-MM-DD HH:mm:ss')}</div>
              </div>
            </span>
            <span className={styles.infoItem}>
              <img alt="" src={_.get(syncStatusMap, `${syncStatus}.icon`)} className={styles.infoImg} />
              <div className={styles.info}>
                <div className={styles.infoTitle}>同步状态</div>
                <div className={styles.infoContent}>
                  {_.get(syncStatusMap, `${syncStatus}.name`)}
                  <Tooltip
                    placement="bottom"
                    title={formatTooltipTitle}
                    overlayClassName={styles.tooltip}
                  >
                    <img alt="" src={tooltip} className={styles.tooltipIcon} />
                  </Tooltip>
                </div>
              </div>
            </span>
            <span className={styles.infoItem}>
              <div className={styles.info}>
                <div className={styles.infoTitle}>{`同步 ${(processedRows / totalRows) * 100}%`}</div>
                <div className={styles.infoContent}>{getSyncTimeContent()}</div>
              </div>
            </span>
          </div>
        </div>
        <div className={styles.leftColumn}>
          <Tabs
            activeKey={activeKey}
            tabPosition="right"
            onChange={changeActiveKey}
          >
            {
              tableIds.map((item, index) => (
                <TabPane tab={item.name} key={index} />))
            }
          </Tabs>
        </div>
        <div className={styles.rightColumn}>
          <Tabs
            defaultActiveKey="data"
            onChange={() => {}}
          >
            <TabPane tab="数据预览" key="data">
              {
                getDataTable()
              }
            </TabPane>
            <TabPane tab="历史记录" key="log">{historyRecord}</TabPane>
          </Tabs>
        </div>
        <TransferModal
          visible={transferModalVisible}
          closeTransfer={closeTransfer}
          users={users}
          groups={[]}
          shareList={shareUserList}
          shareGroups={shareGroupList}
          owner={owner}
          onSubmit={transferOwner}
        />
      </div>
    </Spin>
  )
}

const mapStateToProps = ({ dsDetail }) => ({
  dsDetail
})

export default connect(mapStateToProps)(DsDetail)