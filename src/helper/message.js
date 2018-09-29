import message from 'antd/lib/message';
import 'antd/lib/message/style/css'
import _ from 'lodash';

const messages = {
  success: (text, duration) => { message.success(text, duration) },
  error: (text, duration) => { message.error(text, duration) },
  warning: (text, duration) => { message.warning(text, duration) }
};

const globalMessage = (type, text, duration = 3) => {
  const messageFuc = _.get(messages, type);
  if (messageFuc) {
    messageFuc(text, duration);
  }
};

export default globalMessage;