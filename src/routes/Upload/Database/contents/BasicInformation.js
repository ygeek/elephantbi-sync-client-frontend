import React from 'react';
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Input from 'antd/lib/input'
import 'antd/lib/input/style/css'
import _ from 'lodash'
import Footer from '../../Footer';
import { databaseConfig } from '../../SelectDatabase/config'
import styles from './index.less'

const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 }
}

const BasicInformation = ({
  sublimeData,
  sourceType,
  form,
  changeTableNames,
  goPrev,
  goAfter,
  changeFileName,
  changeDescription,
  filterTableList
}) => {
  const { getFieldDecorator } = form
  const tableNames = _.get(sublimeData, 'table_names', [])
  const filtertables = filterTableList.map((item) => {
    return _.find(tableNames, { old_table_name: item })
  })
  const getTableNameItems = () => {
    return (
      <table className={styles.sheetTable}>
        <thead>
          <tr><td>原名称</td><td>显示名称</td></tr>
        </thead>
        <tbody>
          {
            _.map(filtertables, (table, index) => {
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

  const submit = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        const { name, description, source_type, ...tableNames } = values
        changeFileName(name)
        changeDescription(description);
        changeTableNames(tableNames);
        goAfter()
      }
    })
  }
  return (
    <div className={styles.basicInformation}>
      <div className={styles.wrapper}>
      <Form className={styles.formField}>
        <FormItem
          {...formLayout}
          label="数据源类型"
        >
          {
            getFieldDecorator('source_type')(
              <span>{_.get(_.find(databaseConfig, { source_type: parseInt(sourceType, 10) }), 'name')}</span>
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
              initialValue: _.get(sublimeData, 'name')
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
              initialValue: _.get(sublimeData, 'description')
            })(<Input.TextArea rows={3} />)
          }
        </FormItem>
      </Form>
      </div>
      <Footer
        text1="上一步"
        text2="下一步"
        click1={goPrev}
        click2={submit}
      />
    </div>
  )
}

export default Form.create()(BasicInformation)