import React from 'react'
import Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
import _ from 'lodash';
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Select from 'antd/lib/select'
import 'antd/lib/select/style/css'
import { syncModeOptions } from './optionsConfig'
import Input from 'antd/lib/input'
import Footer from '../../Footer';
import 'antd/lib/input/style/css'
import styles from './index.less'

const { TabPane } = Tabs
const { Option } = Select
const FormItem = Form.Item
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 }
}

// const tableNames = [{
//   old_table_name: '订单', new_table_name: '订单'
// }, {
//   old_table_name: '销售', new_table_name: '销售'
// }, {
//   old_table_name: '人员', new_table_name: '人员'
// }]

// const tableToColumns = {
//   '订单': [{
//     name: '姓名', nick_name: '姓名', data_type: 'string'
//   }, {
//     name: '年龄', nick_name: '年龄', data_type: 'number'
//   }, {
//     name: '生日', nick_name: '生日', data_type: 'date'
//   }],
//   '销售': [{
//     name: '姓名', nick_name: '姓名', data_type: 'string'
//   }, {
//     name: '年龄', nick_name: '年龄', data_type: 'number'
//   }, {
//     name: '生日', nick_name: '生日', data_type: 'date'
//   }],
//   '人员': [{
//     name: '姓名', nick_name: '姓名', data_type: 'string'
//   }, {
//     name: '年龄', nick_name: '年龄', data_type: 'number'
//   }, {
//     name: '生日', nick_name: '生日', data_type: 'date'
//   }]
// }

// const syncInfo = {
//   '订单': { sync_mode: 'all', column: null },
//   '销售': { sync_mode: 'all', column: null },
//   '人员': { sync_mode: 'all', column: null },
// }

const SynchronousMode = ({ sublimeData, changeSyncInfo, goPrev }) => {
  const tableNames = _.get(sublimeData, 'table_names', [])
  const tableToColumns = _.get(sublimeData, 'table_to_columns', {})
  const syncInfo = _.get(sublimeData, 'sync_info', {})
  const getOption = (options) => {
    return _.map(options, (option) => {
      return <Option key={option.value || option.name}>{option.title || option.name}</Option>
    })
  }
  const renderForm = ({ columns, oldName, serial }) => {
    return (
      <Form className={styles.formField}>
        <FormItem
          label="同步模式"
          {...formLayout}
        >
          <Select
            value={_.get(syncInfo, `${oldName}.sync_mode`)}
            onChange={(val) => {
              changeSyncInfo(oldName, { sync_mode: val })
            }}
          >
            {getOption(syncModeOptions)}
          </Select>
        </FormItem>
        {
          _.get(syncInfo, `${oldName}.sync_mode`) !== 'all' ? (
            <FormItem
              label="递增列"
              {...formLayout}
            >
              <Select
                value={_.get(syncInfo, `${oldName}.column`)}
                onChange={(val) => {
                  changeSyncInfo(oldName, { column: val })
                }}
              >
                {getOption(columns)}
              </Select>
            </FormItem>
          ) : null
        }
      </Form>
    )
  }
  return (
    <div className={styles.synchronousMode}>
      <div className={styles.wrapper}>
      <Tabs>
        {
          tableNames.map((item, index) => {
            return (
              <TabPane
                tab={item.new_table_name}
                key={index}
              >
                {renderForm({
                  columns: _.get(tableToColumns, item.old_table_name),
                  oldName: item.old_table_name,
                  serial: index
                })}
              </TabPane>
            )
          })
        }
      </Tabs>
      </div>
      <Footer
        text1="上一步"
        text2="完成"
        click1={goPrev}
      />
    </div>
  )
}

export default SynchronousMode;
