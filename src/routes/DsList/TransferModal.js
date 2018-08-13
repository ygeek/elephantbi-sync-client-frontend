import React from 'react';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/css';
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import AutoSearchComponent from 'components/AutoSearchComponent'
import styles from './index.less';

const TransferModal = ({
  form,
  visible,
  closeTransfer,
  users,
  owner,
  onSubmit,
}) => {
  const FormItem = Form.Item
  const { getFieldDecorator } = form
  const onSublime = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        const { user } = values
        closeTransfer()
        onSubmit({ user_id: user.split('_')[1] })
      }
    })
  }
  return (
    <Modal
      visible={visible}
      title="转移数据源给"
      footer={null}
      onCancel={closeTransfer}
      className={styles.shareModal}
    >
      <Form className={styles.form}>
        <FormItem>
          {
            getFieldDecorator('user', {
              rules: [{ required: true, message: '此项是必填的' }]
            })(
              <AutoSearchComponent
                options={users}
                excludeOptions={[owner]}
              />
            )
          }
        </FormItem>
      </Form>
      <button
        className={styles.submitButton}
        onClick={onSublime}
      >
        分享
      </button>
    </Modal>
  )
}

export default Form.create()(TransferModal);
