import React from 'react'
import toolTip from 'assets/tooltip1.svg'

const tooltipTitle = ({
  status,
  syncStatus,
  startSync,
  stopSync,
  confirmSync,
  trigger
}) => {
  switch (syncStatus) {
    case 2: //等待同步
      return (
        <span><img alt="" src={toolTip} />正在等待同步，请稍作等待；您也可以点击“<a href="javascript:void(0)" onClick={trigger}>立即触发同步</a>”，将立即开始同步</span>
      )
    case 3: //同步中
      if (status === 0) {
        return (
          <span><img alt="" src={toolTip} />数据正在同步中，请稍后查看数据；同步完成后，会向您发送消息</span>
        )
      }
      return (
        <span><img alt="" src={toolTip} />数据正在同步中，请同步成功后查看最新的数据</span>
      )
    case 1: //同步待确认
      return (
        <span><img alt="" src={toolTip} />数据源格式发生变更，需要您确认是否继续同步，继续同步请点击“<a href="javascript:void(0)" onClick={confirmSync}>同步确认</a>”</span>
      )
    case 4: //同步正常
      return (
        <span><img alt="" src={toolTip} />数据已更新成功；您也可以点击“<a href="javascript:void(0)" onClick={trigger}>立即触发同步</a>”，重新进行数据同步</span>
      )
    case 6: //同步异常
      return (
        <span><img alt="" src={toolTip} />同步发生异常，稍后会重新自动进行数据同步；您也可以点击“<a href="javascript:void(0)" onClick={trigger}>立即触发同步</a>”，将立即开始同步</span>
      )
    case 5: //同步失败
      return (
        <span><img alt="" src={toolTip} />同步已失败，继续之前的同步需要您点击“<a href="javascript:void(0)" onClick={startSync}>开启同步</a>”，重新进行同步</span>
      )
    case 0: //离线
      return (
        <span><img alt="" src={toolTip} />已离线同步，继续之前的同步需要您点击“<a href="javascript:void(0)" onClick={startSync}>开启同步</a>”，重新进行连接</span>
      )
    default:
      return null
  }
}

export default tooltipTitle;