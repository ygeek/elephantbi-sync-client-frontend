import React from 'react';
import { connect } from 'dva'
import Steps from 'antd/lib/steps';
import 'antd/lib/steps/style/css'
import _ from 'lodash';
import { routerRedux } from 'dva/router'
import { stepConfig, actionConfig } from './config';
import AccountInformation from './contents/AccountInfomation';
import SelectWorksheet from './contents/SelectWorksheet'
import Footer from '../Footer';
import styles from './index.less'

const { Step } = Steps;


const Database = ({ upload, dispatch }) => {
  const { currentStep, dataSource, sublimeData } = upload;
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

  const changeTableNames = () => {
    dispatch({ type: 'upload/changeTableNames' })
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>连接数据库</div>
          <div className={styles.steps}>
            <Steps size="small" current={currentStep}>
              { stepConfig.map((step, index) => <Step key={index} title={step.title}/>) }
            </Steps>
          </div>
          <div className={styles.stepContent}>
            {
              currentStep === 0 ? (
                <AccountInformation
                  dispatch={dispatch}
                />
              ) : null
            }
            {
              currentStep === 1 ? (
                <SelectWorksheet
                  dataSource={_.get(dataSource, 'preview', [])}
                  dispatch={dispatch}
                  sublimeData={sublimeData}
                  changeTableToColumns={changeTableToColumns}
                  changeFilterTableList={changeFilterTableList}
                />
              ) : null
            }
          </div>
        </div>
      </div>
      <Footer
        {...actionConfig({ cancel, goPrev, goAfter, changeTableNames })[currentStep]}
      />
    </div>
  )
}

const mapStateToProps = ({ upload }) => ({
  upload
})

export default connect(mapStateToProps)(Database);
