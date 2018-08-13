import React from 'react';
import { connect } from 'dva'
import _ from 'lodash'
import Modal from 'antd/lib/modal'
import 'antd/lib/modal/style/css'
import { routerRedux } from 'dva/router'
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
  const groups = _.get(dsList, 'groups', [])
  const owner = _.get(currentTransferData, 'user', {})
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
  const getDsList = () => {
    return _.map(list, (listItem, index) => {
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
        />
      )
    })
  }
  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.content}
        style={{ height: firstLogin === 1 ? 'calc(100% - 50px)' : '100%' }}
      >
        {getDsList()}
        <button
          className={styles.loadmore}
          style={{ display: firstLogin === 0 ? 'block' : 'none' }}
          onClick={() => {
            dispatch({ type: 'dsList/loadmore' });
            dispatch({ type: 'dsList/fetchDsList' })
          }}
        >
          加载更多
        </button>
        <div
          className={styles.deadline}
          style={{ display: firstLogin === 0 ? 'block' : 'none' }}
        >
          <div className={styles.divider} />我是有底线的 <div className={styles.divider}/>
        </div>
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
        groups={groups}
        shareList={shareUserList}
        shareGroups={shareGroupList}
        owner={owner}
        onSubmit={transferOwner}
      />
    </div>
  )
}

const mapStateToProps = ({ dsList, currentUser }) => ({
  dsList, currentUser
})

export default connect(mapStateToProps)(DsList)