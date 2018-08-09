import React from 'react';
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import Col from 'antd/lib/col'
import 'antd/lib/col/style/css'
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import Footer from '../../Footer';
import styles from './index.less';

const FormItem = Form.Item
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 }
}

class AccountInformation extends React.Component {
  render() {
    const { form, dispatch, sourceType, cancel, goAfter } = this.props
    const { getFieldDecorator } = form
    const databaseConnect = () => {
      form.validateFields((errors, values) => {
        if (!errors) {
          dispatch({
            type: 'upload/setDatabaseInfo',
            payload: { ...values, sourceType }
          })
          dispatch({ type: 'upload/connectDatabase' })
        }
      })
    }
    return (
      <div className={styles.accountInformation}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
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
            <div className={styles.bottomButton}>
              <Button
                type="primary"
                onClick={databaseConnect}
              >
                连接
            </Button>
            </div>
          </div>
        </div>
        <Footer
          text1="取消"
          text2="下一步"
          click1={cancel}
          click2={goAfter}
        />
      </div>
    )
  }
}

export default Form.create()(AccountInformation);