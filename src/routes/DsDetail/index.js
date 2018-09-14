import React from 'react'
import { connect } from 'dva'
import _ from 'lodash'
import Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css';
import Dropdown from 'antd/lib/dropdown'
import 'antd/lib/dropdown/style/css'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import Modal from 'antd/lib/modal'
import 'antd/lib/modal/style/css'
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'
import DataSourceTable from 'components/DataSourceTable'
import moment from 'moment'
import worksheet from 'assets/worksheet.png'
import sizeIcon from 'assets/size.png'
import { routerRedux } from 'dva/router'
import { syncStatus, dslistMap } from '../config'
import styles from './index.less'

const DsDetail = ({ dsDetail, dispatch }) => {
  const { dsDetail: dataSource, activeKey, tableIds, dsId, dsLog, currentTable } = dsDetail
  const currentColumns = _.get(currentTable, 'columns', [])
  const currentRecords = _.get(currentTable, 'records', [])
  const currentTableName = _.get(currentTable, 'table_name')
  const status = _.get(dataSource, 'sync_status')
  const sourceType = _.get(dataSource, 'source_type')
  const { TabPane } = Tabs
  const changeColumns = (payload) => {
    dispatch({ type: 'dsDetail/changeColumns', payload })
  }
  const logTypeMap = {
    ADD: '新增',
    UPDATE: '更新'
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
  const historyRecord = (
    <Table
      columns={historyColumn}
      dataSource={dsLog}
      pagination={false}
      className={styles.logTable}
    />
  )
  const MenuItem = Menu.Item
  const clickMenu = ({ key }) => {
    if (key === 'edit') {
      dispatch(routerRedux.push(`/ds/edit/${dsId}`))
    }
    if (key === 'delete') {
      Modal.confirm({
        title: '删除数据源',
        content: '若删除数据源，关联工作表和卡片将一并删除，是否确认删除',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          dispatch({ type: 'dsDetail/deleteDs' })
        }
      })
    }
  }
  const operateMenu = (
    <Menu
      onClick={clickMenu}
    >
      <MenuItem key="edit">编辑</MenuItem>
      <MenuItem key="delete">删除</MenuItem>
    </Menu>
  )
  const changeActiveKey = (key) => {
    dispatch({ type: 'dsDetail/changeActiveKey', payload: key })
    dispatch({ type: 'dsDetail/fetchDsLog' })
    dispatch({ type: 'dsDetail/fetchDsDetail' })
  }
  return (
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
             overlay={operateMenu}
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
            <img alt="" src={_.get(syncStatus, `${status}.icon`)} className={styles.infoImg} />
            <div className={styles.info}>
              <div className={styles.infoTitle}>同步状态</div>
              <div className={styles.infoContent}>离线</div>
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
            <DataSourceTable
              columns={currentColumns}
              dataSource={currentRecords}
              tableName={currentTableName}
              tableToColumns={currentColumns}
              changeTableToColumns={changeColumns}
            />
          </TabPane>
          <TabPane tab="历史记录" key="log">{historyRecord}</TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const mapStateToProps = ({ dsDetail }) => ({
  dsDetail
})

export default connect(mapStateToProps)(DsDetail)