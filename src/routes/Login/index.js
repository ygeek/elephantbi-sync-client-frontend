import React from 'react';
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Input from 'antd/lib/input'
import 'antd/lib/input/style/css';
import { connect } from 'dva'
import _ from 'lodash'
import styles from './index.less';

const Login = ({ form, login: modelState, dispatch }) => {
  const FormItem = Form.Item;
  const { getFieldDecorator, getFieldValue, setFields } = form;
  const formLayout = {
    labelCol: { span: 5, offset: 1 },
    wrapperCol: { span: 16, offset: 1 }
  }

  const setFormFields = (valueName, value, errors, setFields) => {
    setFields({
      [valueName]: {
        value,
        errors
      }
    });
  };
  const login = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'login/fetchToken', payload: values
        }).then(({ data, err }) => {
          if (data && _.get(data, 'exists') === 0) {
            setFormFields('domain', getFieldValue('domain'), [new Error('当前域名不存在')], setFields);
            return
          }
          const errStatus = _.get(err, 'response.error');
          switch (errStatus) {
            case 'LOGIN_EMAIL_NOT_EXISTS':
            case 'LOGIN_MOBILE_NOT_EXISTS':
              setFormFields('username', getFieldValue('username'), [new Error('当前帐号不存在')], setFields);
              break;
            case 'INVALID_CREDENTIALS':
              setFormFields('password', getFieldValue('password'), [new Error('帐号或密码错误')], setFields);
              break;
            default:
              break;
          }
        })
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
          label="邮箱/手机号"
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
