import React from 'react';
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import Col from 'antd/lib/col'
import 'antd/lib/col/style/css'
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css'
import styles from './index.less';

const FormItem = Form.Item
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 }
}

const AccountInformation = ({ form }) => {
  const { getFieldDecorator } = form
  return (
    <div className={styles.accountInformation}>
      <Form>
        <Row>
          <Col
            span={16}
          >
            <FormItem
              label="Host"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14, offset: 3 }}
            >
              {
                getFieldDecorator('host', {
                  rules: [{ required: true, message: '此项必填' }]
                })(<Input />)
              }
            </FormItem>
          </Col>
          <Col
            span={8}
          >
            <FormItem
              label="Port"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 12, offset: 2 }}
            >
              {
                getFieldDecorator('port', {
                  rules: [{ required: true, message: '此项必填' }]
                })(<Input />)
              }
            </FormItem>
          </Col>
        </Row>
        <FormItem
          label="Database"
          {...formLayout}
        >
          {
            getFieldDecorator('db_name', {
              rules: [{ required: true, message: '此项必填' }]
            })(<Input />)
          }
        </FormItem>
        <FormItem
          label="用户名"
          {...formLayout}
        >
          {
            getFieldDecorator('username', {
              rules: [{ required: true, message: '此项必填' }]
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem
          label="密码"
          {...formLayout}
        >
          {
            getFieldDecorator('password', {
              rules: [{ required: true, message: '此项必填' }]
            })(
              <Input type="password" />
            )
          }
        </FormItem>
      </Form>
    </div>
  )
}

export default AccountInformation

