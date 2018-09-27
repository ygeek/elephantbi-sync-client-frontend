import React from 'react'
import Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
import _ from 'lodash';
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Select from 'antd/lib/select'
import 'antd/lib/select/style/css'
import { syncModeOptions } from '../../Upload/Database/contents/optionsConfig'
import 'antd/lib/input/style/css'
import styles from './index.less'

const { TabPane } = Tabs
const { Option } = Select
const FormItem = Form.Item
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 }
}

const SynchronousMode = ({ tableToColumns, tableNames, changeSyncMode, syncMode }) => {
  const getOption = (options) => {
    return _.map(options, (option) => {
      return <Option key={option.value || option.name}>{option.title || option.name}</Option>
    })
  }

  const getColumnOption = (columns) => {
    return _.map(columns, (option) => {
      return <Option key={option.unique_id}>{option.name}</Option>
    })
  }
  const renderForm = ({ columns, oldName, serial }) => {
    const currentMode = _.get(syncMode, `${oldName}.mode`)
    let filterColumns = []
    if (currentMode === '1') {
      filterColumns = columns.filter(item => item.data_type === 'date')
    }
    if (currentMode === '2') {
      filterColumns = columns.filter(item => item.data_type === 'number')
    }
    return (
      <Form className={styles.formField}>
        <FormItem
          label="同步模式"
          {...formLayout}
        >
          <Select
            value={_.get(syncMode, `${oldName}.mode`)}
            onChange={(val) => {
              changeSyncMode(oldName, { mode: val })
            }}
          >
            {getOption(syncModeOptions)}
          </Select>
        </FormItem>
        {
          _.get(syncMode, `${oldName}.mode`) !== '0' ? (
            <FormItem
              label="递增列"
              {...formLayout}
            >
              <Select
                value={_.get(syncMode, `${oldName}.by_col_uuid`)}
                notFoundContent="暂无字段可选择"
                onChange={(val) => {
                  changeSyncMode(oldName, {
                    by_col_uuid: val,
                    by_col_name: _.get(_.find(columns, { unique_id: val }), 'name')
                  })
                }}
              >
                {getColumnOption(filterColumns)}
              </Select>
            </FormItem>
          ) : null
        }
      </Form>
    )
  }
  return (
    <Tabs className={styles.synchronousMode}>
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
  )
}

export default SynchronousMode;
