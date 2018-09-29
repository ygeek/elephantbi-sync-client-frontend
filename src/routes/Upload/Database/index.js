import React from 'react';
import { connect } from 'dva'
import Steps from 'antd/lib/steps';
import 'antd/lib/steps/style/css'
import Spin from 'antd/lib/spin'
import 'antd/lib/spin/style/css'
import _ from 'lodash';
import { routerRedux } from 'dva/router'
import { stepConfig } from './config';
import AccountInformation from './contents/AccountInfomation';
import SelectWorksheet from './contents/SelectWorksheet'
import BasicInformation from './contents/BasicInformation'
import SynchronizationCycle from './contents/SynchronizationCycle'
import SynchronousMode from './contents/SynchronousMode'
import styles from './index.less'

const { Step } = Steps;


const Database = ({ upload, dispatch }) => {
  const {
    currentStep,
    dataSource,
    sublimeData,
    sourceType,
    filterTableList,
    dbType,
    loadingCount,
    databaseInfo
  } = upload;

  const cancel = () => {
    dispatch(routerRedux.push('/selectDatabase'))
  }
  const goPrev = () => {
    dispatch({ type: 'upload/changeStep', payload: 'prev' })
  }
  const goAfter = () => {
    dispatch({ type: 'upload/changeStep', payload: 'after' })
  }

  const changeTableToColumns = (payload) => {
    dispatch({ type: 'upload/changeTableToColumns', payload })
  }

  const changeFilterTableList = (payload) => {
    dispatch({ type: 'upload/changeFilterTableList', payload })
  }

  const changeFileName = (name) => {
    dispatch({ type: 'upload/changeFileName', payload: name })
  }

  const changeDescription = (description) => {
    dispatch({ type: 'upload/changeDescription', payload: description })
  }

  const filterTableNames = (tableNames) => {
    dispatch({ type: 'upload/filterTableNames', payload: tableNames })
  }

  const changeSyncInfo = (name, params) => {
    dispatch({ type: 'upload/changeSyncInfo', payload: { name, params } })
  }

  const changeTableNames = (payload) => {
    dispatch({ type: 'upload/changeTableNames', payload })
  }

  const submitSyncCycle = (payload) => {
    dispatch({ type: 'upload/submitSyncCycle', payload })
  }

  const createDs = () => {
    dispatch({ type: 'upload/createDbDs' })
  }

  return (
    <Spin spinning={loadingCount > 0}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>连接数据库</div>
          <div className={styles.steps}>
            <Steps size="small" current={currentStep}>
              {stepConfig.map((step, index) => <Step key={index} title={step.title} />)}
            </Steps>
          </div>
          <div className={styles.stepContent}>
            {
              currentStep === 0 ? (
                <AccountInformation
                  dispatch={dispatch}
                  cancel={cancel}
                  goAfter={goAfter}
                  databaseInfo={databaseInfo}
                />
              ) : null
            }
            {
              currentStep === 1 ? (
                <SelectWorksheet
                  dataSource={dataSource}
                  dispatch={dispatch}
                  sublimeData={sublimeData}
                  changeTableToColumns={changeTableToColumns}
                  changeFilterTableList={changeFilterTableList}
                  filterTableNames={filterTableNames}
                  goPrev={goPrev}
                  goAfter={goAfter}
                  filterTableList={filterTableList}
                />
              ) : null
            }
            {
              currentStep === 2 ? (
                <BasicInformation
                  sublimeData={sublimeData}
                  sourceType={sourceType}
                  goPrev={goPrev}
                  goAfter={goAfter}
                  changeTableNames={changeTableNames}
                  changeFileName={changeFileName}
                  changeDescription={changeDescription}
                  filterTableList={filterTableList}
                  databaseInfo={databaseInfo}
                />
              ) : null
            }
            {
              currentStep === 3 ? (
                <SynchronizationCycle
                  goPrev={goPrev}
                  goAfter={goAfter}
                  submitSyncCycle={submitSyncCycle}
                />
              ) : null
            }
            {
              currentStep === 4 ? (
                <SynchronousMode
                  sublimeData={sublimeData}
                  changeSyncInfo={changeSyncInfo}
                  goPrev={goPrev}
                  createDs={createDs}
                />
              ) : null
            }
          </div>
        </div>
      </div>
    </Spin>
  )
}

const mapStateToProps = ({ upload }) => ({
  upload
})

export default connect(mapStateToProps)(Database);
