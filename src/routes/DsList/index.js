import React from 'react';
import { connect } from 'dva'
import _ from 'lodash'
import { Spin } from 'antd'
import Modal from 'antd/lib/modal'
import 'antd/lib/modal/style/css'
import { routerRedux } from 'dva/router'
import arrow from 'assets/arrow.svg';
import defaultPage from 'assets/dashDsDefault.svg'
import TransferModal from './TransferModal'
import Footer from '../Upload/Footer'
import DsListItem from './DsListItem'
import styles from './index.less';

const DsList = ({ dsList, dispatch, currentUser }) => {
  const canSync = _.get(dsList, 'canSync', [])
  const firstLogin = _.get(currentUser, 'firstLogin')
  const list = _.get(dsList, 'list', [])
  const transferModalVisible = _.get(dsList, 'transferModalVisible')
  const users = _.get(dsList, 'users', []);
  const currentTransferData = _.get(dsList, 'currentTransferId');
  const shareUserList = _.get(currentTransferData, 'shared_users_list', [])
  const shareGroupList = _.get(currentTransferData, 'shared_groups_list', [])
  const pageInfo = _.get(dsList, 'pageInfo')
  const loadingCount = _.get(dsList, 'loadingCount', 0)
  const meta = _.get(dsList, 'meta')
  const groups = _.get(dsList, 'groups', [])
  const owner = _.get(currentTransferData, 'user', {})
  const syncStatus = _.get(dsList, 'syncStatus', null)
  const changeCanSync = (id) => {
    dispatch({ type: 'dsList/changeCanSync', payload: id })
  }
  const toDetail = (id) => {
    dispatch(routerRedux.push(`/dsDetail/${id}`))
  }
  const toEdit = (id) => {
    dispatch(routerRedux.push(`/ds/edit/${id}`))
  }
  const deleteDs = (id) => {
    Modal.confirm({
      title: '删除数据源',
      content: '若删除数据源，关联的工作表和卡片将一并删除，是否确认删除',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        dispatch({ type: 'dsList/deleteDs', payload: id })
      }
    })
  }

  let data = []
  _.forIn(list, (value, key) => {
    data = [...data, ...value]
  })
  data = data.map((item) => {
    if (`${item.id}` === `${_.get(syncStatus, 'ds_id')}`) {
      return { ...item, sync_status: _.get(syncStatus, 'ds_status'), rows_count: _.get(syncStatus, 'rows_count'), }
    }
    return item
  })

  const showTransfer = (id) => {
    dispatch({ type: 'dsList/setCurrentTransferId', payload: id })
    dispatch({ type: 'dsList/showTransferModal' })
  }
  const transferOwner = (params) => {
    const { user_id: userID } = params
    Modal.confirm({
      title: '转让数据源',
      content: `将数据源转让给${_.get(_.find(users, { id: parseInt(userID, 10) }), 'name')}后，你将不再有此数据源的任何权限，是否确认操作`,
      onOk() {
        dispatch({ type: 'dsList/tranferUser', payload: params })
      },
      okText: '确认',
      cancelText: '取消'
    })
  }
  const closeTransfer = () => {
    dispatch({ type: 'dsList/hideTransferModal' })
  }

  const confirmSync = (id) => {
    dispatch({ type: 'dsList/confirmSync', payload: id })
  }

  const startSync = (id, type) => {
    dispatch({ type: 'dsList/startSync', payload: { id, type } })
  }

  const stopSync = (id) => {
    dispatch({ type: 'dsList/stopSync', payload: id })
  }
  const getDsList = () => {
    return _.map(data, (listItem, index) => {
      const id = _.get(listItem, 'id')
      const checked = canSync.includes(id);
      return (
        <DsListItem
          key={index}
          data={listItem}
          firstLogin={firstLogin}
          checked={checked}
          changeCanSync={changeCanSync}
          toDetail={toDetail}
          toEdit={toEdit}
          deleteDs={deleteDs}
          showTransfer={showTransfer}
          startSync={startSync}
          stopSync={stopSync}
          confirmSync={confirmSync}
        />
      )
    })
  }

  return (
    <Spin spinning={loadingCount > 0}>
      <div
        className={styles.container}
      >
        <div
          className={styles.content}
          style={{ height: firstLogin === 1 ? 'calc(100% - 50px)' : '100%' }}
        >
          <div>
            {getDsList()}
            <button
              className={styles.loadmore}
              style={{ display: _.get(pageInfo, 'page') < _.get(meta, 'page_count') ? 'block' : 'none' }}
              onClick={() => {
                dispatch({ type: 'dsList/loadmore' });
                dispatch({ type: 'dsList/fetchDsList' })
              }}
            >
              加载更多
            </button>
            <div
              className={styles.deadline}
              style={{ display: _.get(pageInfo, 'page') >= _.get(meta, 'page_count') && data.length > 0  ? 'block' : 'none' }}
            >
              <div className={styles.divider} />我是有底线的 (⊙ˍ⊙)<div className={styles.divider}/>
            </div>
          </div>
          {
            data.length === 0 && loadingCount === 0 ? (
              <div
                className={styles.dsDefault}
              >
                <img alt="" src={arrow} className={styles.arrow} />
                <img alt="" src={defaultPage} className={styles.default} />
                <div>暂无客户端同步类型数据源，请点击右上角 <font color="#76c1ef">新增数据源</font> 建立同步数据源</div>
              </div>
            ) : null
          }
        </div>
        <div
          className={styles.footer}
          style={{ display: firstLogin === 1 ? 'block' : 'none' }}
        >
          <Footer
            text1="跳过"
            text2="开始同步"
            click1={() => {
              dispatch({ type: 'currentUser/changeStatus' })
              dispatch({ type: 'dsList/fetchDsList' })
            }}
            click2={() => {
              dispatch({ type: 'currentUser/changeStatus' })
              dispatch({ type: 'dsList/fetchDsList' })
            }}
          />
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

const mapStateToProps = ({ dsList, currentUser }) => ({
  dsList, currentUser
})

export default connect(mapStateToProps)(DsList)