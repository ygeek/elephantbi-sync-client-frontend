import React from 'react';
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Input from 'antd/lib/input'
import 'antd/lib/input/style/css';
import { connect } from 'dva'
import styles from './index.less';

const Login = ({ form, login: modelState, dispatch }) => {
  const FormItem = Form.Item;
  const { getFieldDecorator } = form;
  const formLayout = {
    labelCol: { span: 4, offset: 1 },
    wrapperCol: { span: 16, offset: 1 }
  }
  const login = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({ type: 'login/fetchToken', payload: values })
      }
    })
  }
  return (
    <div className={styles.container}>
      <Form className={styles.formField}>
        <FormItem
          label="域名"
          {...formLayout}
        >
          {
            getFieldDecorator('domain', {
              rules: [{ required: true, message: '此项是必填的' }]
            })(
              <Input
                addonAfter=".elephantbi.com"
              />
            )
          }
        </FormItem>
        <FormItem
          label="用户名"
          {...formLayout}
        >
          {
            getFieldDecorator('username', {
              rules: [{ required: true, message: '此项是必填的' }]
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
              rules: [{ required: true, message: '此项是必填的' }]
            })(
              <Input type="password" />
            )
          }
        </FormItem>
        <button
          className={styles.submitBtn}
          onClick={login}
        >
          登录
        </button>
      </Form>
    </div>
  )
}

const mapStateToProps = ({ login }) => ({
  login
})

export default connect(mapStateToProps)(Form.create()(Login))
