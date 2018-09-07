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
import { cycleOptions, weekOption, monthOption, dateOptions, intervalOptions, mostOptions } from '../../Upload/Database/contents/optionsConfig'
import styles from './index.less'

const { Option } = Select;

class SynchronizationCycle extends React.Component {
  render() {
    const { syncInfo, changeSyncInfo, changeSchedule } = this.props
    const {
      freq,
      max_retry: maxRetry,
      retry_interval: retryInterval,
      retry_on_fail: retryOnFail,
      schedule
    } = syncInfo
    const {
      sync_at_day: date,
      sync_at_month: month,
      sync_at_time: time,
      sync_at_weekday: week,
      sync_ends_time: endTime,
      sync_starts_time: startTime
    } = schedule
    const getOptions = (options) => {
      return _.map(options, (option) => {
        return <Option key={option.value}>{option.title}</Option>
      })
    }
    return (
      <div className={styles.synchronizationCycle}>
        <Row align="middle" type="flex">
          <Col span={6}>同步周期：</Col>
          <Col span={18}>
            <Select
              style={{ width: '300px' }}
              value={freq}
              onChange={(val) => { changeSyncInfo({ freq: val }) }}
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
                  onChange={(time, timeString) => {
                    changeSchedule({ sync_starts_time: timeString })
                  }}
                />
                <span className={styles.divider}>~</span>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(endTime, 'HH:mm a')}
                  onChange={(time, timeString) => {
                    changeSchedule({ sync_ends_time: timeString })
                  }}
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
                  onChange={(time, timeString) => { changeSchedule({ sync_at_time: timeString }) }}
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
                  onChange={(val) => { changeSchedule({ sync_at_weekday: val }) }}
                >{getOptions(weekOption)}</Select>
                <span className={styles.divider}>~</span>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(time, 'HH:mm a')}
                  onChange={(time, timeString) => { changeSchedule({ sync_at_time: timeString }) }}
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
                  style={{ width: '90px' }}
                  value={date}
                  onChange={(val) => { changeSchedule({ sync_at_day: val }) }}
                >{getOptions(dateOptions)}</Select>
                <span className={styles.divider}>~</span>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(time, 'HH:mm a')}
                  onChange={(time, timeString) => { changeSchedule({ sync_at_time: timeString }) }}
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
                  onChange={(val) => { changeSchedule({ sync_at_month: val }) }}
                >{getOptions(monthOption)}</Select>
                <span className={styles.divider}>~</span>
                <Select
                  style={{ width: '90px' }}
                  value={date}
                  onChange={(val) => { changeSchedule({ sync_at_day: val }) }}
                >{getOptions(dateOptions)}</Select>
                <span className={styles.divider}>~</span>
                <TimePicker
                  format="hh:mm a"
                  use12Hours
                  style={{ width: '90px' }}
                  placeholder=""
                  value={moment(time, 'HH:mm a')}
                  onChange={(time, timeString) => { changeSchedule({ sync_at_time: timeString }) }}
                />
              </Col>
            </Row>
          ) : null
        }
        <Row>
          <Radio
            checked={retryOnFail}
            onChange={(checked) => {
              changeSyncInfo({ retry_on_fail: checked ? 1 : 0 })
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
              onChange={(val) => { changeSyncInfo({ retry_interval: val }) }}
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
              onChange={(val) => { changeSyncInfo({ max_retry: val }) }}
            >
              {getOptions(mostOptions)}
            </Select>
          </Col>
        </Row>
        <Row>
          <Radio
            checked={!retryOnFail}
            onChange={(checked) => {
              changeSyncInfo({ retry_on_fail: !checked ? 1 : 0 })
            }}
          >
            如果不成功，不重试
          </Radio>
        </Row>
      </div>
    )
  }
}

export default SynchronizationCycle