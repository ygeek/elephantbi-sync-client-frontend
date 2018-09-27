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
import _ from 'lodash'
import moment from 'moment'
import Footer from '../../Footer';
import { cycleOptions, weekOption, monthOption, dateOptions, intervalOptions, mostOptions } from './optionsConfig'
import styles from './index.less'

const { Option } = Select;

class SynchronizationCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freq: 'hourly',
      sync_starts_time: '06:00',
      sync_ends_time: '09:00',
      sync_at_time: '06:00',
      sync_at_weekday: '1',
      sync_at_month: '1',
      sync_at_day: 'LAST_DAY',
      retry_on_fail: 1,
      retry_interval: '30',
      max_retry: '1'
    }
  }

  render() {
    const { goPrev, goAfter, submitSyncCycle } = this.props
    const getOptions = (options) => {
      return _.map(options, (option) => {
        return <Option key={option.value}>{option.title}</Option>
      })
    }
    const {
      freq,
      sync_starts_time: startTime,
      sync_ends_time: endTime,
      sync_at_time: time,
      sync_at_weekday: week,
      sync_at_month: month,
      sync_at_day: date,
      retry_on_fail: retryOnFail,
      retry_interval: retryInterval,
      max_retry: maxRetry
    } = this.state
    const changeValue = (value) => {
      this.setState({
        ...this.state,
        ...value
      })
    }
    return (
      <div className={styles.synchronizationCycle}>
        <div className={styles.wrapper}>
          <div className={styles.formField}>
            <Row align="middle" type="flex">
              <Col span={6}>同步周期：</Col>
              <Col span={18}>
                <Select
                  style={{ width: '300px' }}
                  value={freq}
                  onChange={(val) => { changeValue({ freq: val }) }}
                >
                  {getOptions(cycleOptions)}
                </Select>
              </Col>
            </Row>
            {
              freq === 'hourly' ? (
                <Row align="middle" type="flex">
                  <Col span={6}>介于：</Col>
                  <Col span={18}>
                    <TimePicker
                      format="hh:mm a"
                      use12Hours
                      style={{ width: '90px' }}
                      placeholder=""
                      value={moment(startTime, 'HH:mm a')}
                      onChange={(time, timeString) => { changeValue({ sync_starts_time: timeString }) }}
                    />
                    <span className={styles.divider}>~</span>
                    <TimePicker
                      format="hh:mm a"
                      use12Hours
                      style={{ width: '90px' }}
                      placeholder=""
                      value={moment(endTime, 'HH:mm a')}
                      onChange={(time, timeString) => { changeValue({ sync_ends_time: timeString }) }}
                    />
                  </Col>
                </Row>
              ) : null
            }
            {
              freq === 'daily' || freq === 'workday' ? (
                <Row align="middle" type="flex">
                  <Col span={6}>在：</Col>
                  <Col span={18}>
                    <TimePicker
                      format="hh:mm a"
                      use12Hours
                      style={{ width: '90px' }}
                      placeholder=""
                      value={moment(time, 'HH:mm a')}
                      onChange={(time, timeString) => { changeValue({ sync_at_time: timeString }) }}
                    />
                  </Col>
                </Row>
              ) : null
            }
            {
              freq === 'weekly' ? (
                <Row align="middle" type="flex">
                  <Col span={6}>在：</Col>
                  <Col span={18}>
                    <Select
                      style={{ width: '90px' }}
                      value={week}
                      onChange={(val) => { changeValue({ sync_at_weekday: val }) }}
                    >{getOptions(weekOption)}</Select>
                    <span className={styles.divider}>~</span>
                    <TimePicker
                      format="hh:mm a"
                      use12Hours
                      style={{ width: '90px' }}
                      placeholder=""
                      value={moment(time, 'HH:mm a')}
                      onChange={(time, timeString) => { changeValue({ sync_at_time: timeString }) }}
                    />
                  </Col>
                </Row>
              ) : null
            }
            {
              freq === 'monthly' ? (
                <Row align="middle" type="flex">
                  <Col span={6}>在：</Col>
                  <Col span={18}>
                    <Select
                      style={{ width: '110px' }}
                      value={date}
                      onChange={(val) => { changeValue({ sync_at_day: val }) }}
                    >{getOptions(dateOptions)}</Select>
                    <span className={styles.divider}>~</span>
                    <TimePicker
                      format="hh:mm a"
                      use12Hours
                      style={{ width: '90px' }}
                      placeholder=""
                      value={moment(time, 'HH:mm a')}
                      onChange={(time, timeString) => { changeValue({ sync_at_time: timeString }) }}
                    />
                  </Col>
                </Row>
              ) : null
            }
            {
              freq === 'yearly' ? (
                <Row align="middle" type="flex">
                  <Col span={6}>在：</Col>
                  <Col span={18}>
                    <Select
                      style={{ width: '90px' }}
                      value={month}
                      onChange={(val) => { changeValue({ sync_at_month: val }) }}
                    >{getOptions(monthOption)}</Select>
                    <span className={styles.divider}>~</span>
                    <Select
                      style={{ width: '110px' }}
                      value={date}
                      onChange={(val) => { changeValue({ sync_at_day: val }) }}
                    >{getOptions(dateOptions)}</Select>
                    <span className={styles.divider}>~</span>
                    <TimePicker
                      format="hh:mm a"
                      use12Hours
                      style={{ width: '90px' }}
                      placeholder=""
                      value={moment(time, 'HH:mm a')}
                      onChange={(time, timeString) => { changeValue({ sync_at_time: timeString }) }}
                    />
                  </Col>
                </Row>
              ) : null
            }
            <Row>
              <Radio
                checked={retryOnFail}
                onChange={(checked) => {
                  changeValue({ retry_on_fail: checked ? 1 : 0 })
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
                  onChange={(val) => { changeValue({ retry_interval: val }) }}
                >
                  {getOptions(intervalOptions)}
                </Select>
              </Col>
            </Row>
            <Row align="middle" type="flex">
              <Col span={6}>至多重试：</Col>
              <Col span={18}>
                <Select
                  value={maxRetry}
                  style={{ width: '300px' }}
                  onChange={(val) => { changeValue({ max_retry: val }) }}
                >
                  {getOptions(mostOptions)}
                </Select>
              </Col>
            </Row>
            <Row>
              <Radio
                checked={!retryOnFail}
                onChange={(checked) => {
                  changeValue({ retry_on_fail: !checked ? 1 : 0 })
                }}
              >
                如果不成功，不重试
            </Radio>
            </Row>
          </div>
        </div>
        <Footer
          text1="上一步"
          text2="下一步"
          click1={goPrev}
          click2={() => {
            const {
              freq,
              retry_on_fail: retryOnFail,
              retry_interval: retryInterval,
              max_retry: maxRetry,
              ...schedule
            } = this.state
            submitSyncCycle({
              freq,
              retry_on_fail: retryOnFail,
              retry_interval: retryInterval,
              max_retry: maxRetry,
              schedule
            });
            goAfter();
          }}
        />
      </div>
    )
  }
}

export default SynchronizationCycle