import React from 'react'
import Select from 'antd/lib/select'
import Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import Col from 'antd/lib/col'
import 'antd/lib/col/style/css'
import 'antd/lib/select/style/css'
import TimePicker from 'antd/lib/time-picker'
import 'antd/lib/time-picker/style/css'
import Radio from 'antd/lib/radio'
import 'antd/lib/radio/style/css'
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import _ from 'lodash'
import moment from 'moment'
import { cycleOptions, weekOption, monthOption, dateOptions, intervalOptions, mostOptions } from '../../Upload/Database/contents/optionsConfig'
import styles from './index.less'

const { Option } = Select;

class SynchronizationCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cycle: 'hour',
      startTime: '06:00',
      endTime: '09:00',
      time: '06:00',
      week: 'Mon',
      month: 'Jan',
      date: 'last',
      retry: true,
      retryInterval: '30sec',
      retryMost: '1'
    }
  }

  render() {
    const { form } = this.props
    const getOptions = (options) => {
      return _.map(options, (option) => {
        return <Option key={option.value}>{option.title}</Option>
      })
    }
    const { cycle, startTime, endTime, time, week, month, date, retry, retryInterval, retryMost } = this.state
    const changeValue = (value) => {
      this.setState({
        ...this.state,
        ...value
      })
    }
    return (
      <div className={styles.synchronizationCycle}>
        <Row align="middle" type="flex">
          <Col span={6}>同步周期：</Col>
          <Col span={18}>
            <Select
              style={{ width: '300px' }}
              value={cycle}
              onChange={(val) => { changeValue({ cycle: val }) }}
            >
              {getOptions(cycleOptions)}
            </Select>
          </Col>
        </Row>
        {
          cycle === 'hour' ? (
            <Row align="middle" type="flex">
              <Col span={6}>介于：</Col>
              <Col span={18}>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(startTime, 'HH:mm a')}
                  onChange={(time, timeString) => { changeValue({ startTime: timeString }) }}
                />
                <span className={styles.divider}>~</span>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(endTime, 'HH:mm a')}
                  onChange={(time, timeString) => { changeValue({ endTime: timeString }) }}
                />
              </Col>
            </Row>
          ) : null
        }
        {
          cycle === 'day' || cycle === 'workday' ? (
            <Row align="middle" type="flex">
              <Col span={6}>在：</Col>
              <Col span={18}>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(time, 'HH:mm a')}
                  onChange={(time, timeString) => { changeValue({ time: timeString }) }}
                />
              </Col>
            </Row>
          ) : null
        }
        {
          cycle === 'week' ? (
            <Row align="middle" type="flex">
              <Col span={6}>在：</Col>
              <Col span={18}>
                <Select
                  style={{ width: '90px' }}
                  value={week}
                  onChange={(val) => { changeValue({ week: val }) }}
                >{getOptions(weekOption)}</Select>
                <span className={styles.divider}>~</span>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(time, 'HH:mm a')}
                  onChange={(time, timeString) => { changeValue({ time: timeString }) }}
                />
              </Col>
            </Row>
          ) : null
        }
        {
          cycle === 'month' ? (
            <Row align="middle" type="flex">
              <Col span={6}>在：</Col>
              <Col span={18}>
                <Select
                  style={{ width: '90px' }}
                  value={date}
                  onChange={(val) => { changeValue({ date: val }) }}
                >{getOptions(dateOptions)}</Select>
                <span className={styles.divider}>~</span>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(time, 'HH:mm a')}
                  onChange={(time, timeString) => { changeValue({ time: timeString }) }}
                />
              </Col>
            </Row>
          ) : null
        }
        {
          cycle === 'year' ? (
            <Row align="middle" type="flex">
              <Col span={6}>在：</Col>
              <Col span={18}>
                <Select
                  style={{ width: '90px' }}
                  value={month}
                  onChange={(val) => { changeValue({ month: val }) }}
                >{getOptions(monthOption)}</Select>
                <span className={styles.divider}>~</span>
                <Select
                  style={{ width: '90px' }}
                  value={date}
                  onChange={(val) => { changeValue({ date: val }) }}
                >{getOptions(dateOptions)}</Select>
                <span className={styles.divider}>~</span>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(time, 'HH:mm a')}
                  onChange={(time, timeString) => { changeValue({ time: timeString }) }}
                />
              </Col>
            </Row>
          ) : null
        }
        <Row>
          <Radio
            checked={retry}
            onChange={(checked) => {
              changeValue({ retry: checked })
            }}
          >
            如果不成功，重试
              </Radio>
        </Row>
        <Row align="middle" type="flex">
          <Col span={6}>重试时间间隔：</Col>
          <Col span={18}>
            <Select
              value={retryInterval}
              style={{ width: '300px' }}
              onChange={(val) => { changeValue({ retryInterval: val }) }}
            >
              {getOptions(intervalOptions)}
            </Select>
          </Col>
        </Row>
        <Row align="middle" type="flex">
          <Col span={6}>至多重试：</Col>
          <Col span={18}>
            <Select
              value={retryMost}
              style={{ width: '300px' }}
              onChange={(val) => { changeValue({ retryMost: val }) }}
            >
              {getOptions(mostOptions)}
            </Select>
          </Col>
        </Row>
        <Row>
          <Radio
            checked={!retry}
            onChange={(checked) => {
              changeValue({ retry: !checked })
            }}
          >
            如果不成功，不重试
              </Radio>
        </Row>
      </div>
    )
  }
}

export default Form.create()(SynchronizationCycle)