import React from 'react';
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Input from 'antd/lib/input'
import 'antd/lib/input/style/css'
import _ from 'lodash'
import styles from './index.less'

const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 }
}

const BasicInformation = ({ form }) => {
  const { getFieldDecorator } = form
  const tableNames = []
  const getTableNameItems = () => {
    return (
      <table className={styles.sheetTable}>
        <thead>
          <tr><td>原名称</td><td>显示名称</td></tr>
        </thead>
        <tbody>
          {
            _.map(tableNames, (table, index) => {
              return (
                <tr key={index}>
                  <td>{_.get(table, 'old_table_name')}</td>
                  <td>
                    <FormItem>
                      {
                        getFieldDecorator(_.get(table, 'old_table_name'), {
                          rules: [{ required: true, message: '此项为必填项' }],
                          initialValue: _.get(table, 'new_table_name')
                        })(<input />)
                      }
                    </FormItem>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
  return (
    <Form className={styles.basicInformation}>
    <FormItem
      {...formLayout}
      label="数据源类型"
    >
      {
        getFieldDecorator('source_type')(
          <span>111</span>
        )
      }
    </FormItem>
    <FormItem
      {...formLayout}
      label="数据源名称"
    >
      {
        getFieldDecorator('name', {
          rules: [{ required: true, message: '此项是必填的' }],
        })(<Input />)
      }
    </FormItem>
    <FormItem
      label="工作表名称"
      {...formLayout}
    >
      {
        getTableNameItems()
      }
    </FormItem>
    <FormItem
      label="数据源描述"
      {...formLayout}
    >
      {
        getFieldDecorator('description', {
        })(<Input.TextArea rows={3} />)
      }
    </FormItem>
  </Form>
  )
}

export default BasicInformation