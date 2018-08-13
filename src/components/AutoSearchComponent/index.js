import React from 'react'
import Select from 'antd/lib/select'
import 'antd/lib/select/style/css'
import Avatar from 'antd/lib/avatar'
import 'antd/lib/avatar/style/css'
import _ from 'lodash'
import searchIcon from 'assets/search.png'
import defaultAvatar from 'assets/avatar.jpg'
import group from 'assets/group.png'
import { AVATAR_URL } from 'constants/APIConstants'
import styles from './index.less'

class AutoSearchComponent extends React.Component {
  render() {
    const {
      options,
      excludeOptions,
      mode,
      value,
      onChange,
      groups,
      excludeGroups
    } = this.props
    const { Option } = Select
    const selectProps = {
      showSearch: mode !== 'multiple',
      optionFilterProp: 'children',
      optionLabelProp: 'title',
      mode,
      onChange,
      value
    }

    const getSelectedOptions = () => {
      let originOptions = []
      let extraOptions = []
      if (Array.isArray(options) && Array.isArray(excludeOptions)) {
        originOptions = options.filter(option => !_.find(excludeOptions, { id: option.id }))
      }
      if (Array.isArray(groups) && Array.isArray(excludeGroups)) {
        extraOptions = groups.filter(group => !_.find(excludeGroups, { id: group.id }))
      }
      return [...originOptions, ...extraOptions]
    }
    const getOptions = () => {
      const selectedOptions = getSelectedOptions()
      return selectedOptions.map((item) => {
        return (
          <Option
            key={_.has(item, 'email') ? `user_${item.id}` : `group_${item.id}`}
            title={_.get(item, 'name')}
          >
            {
              _.has(item, 'email') ? (
                <Avatar
                  src={item.avatar ? `${AVATAR_URL}${item.avatar}` : defaultAvatar}
                  size="small"
                  style={{ marginRight: '10px' }}
                />
              ) : (
                <Avatar
                  src={group}
                  size="small"
                  style={{ marginRight: '10px' }}
                />
              )
            }
            {
              _.has(item, 'email') ? (
                `${_.get(item, 'name')} (${_.get(item, 'email')})`
              ) : `${_.get(item, 'name')}`
            }
          </Option>
        )
      })
    }

    return (
      <span className={styles.searchWrapper}>
        <Select
          {...selectProps}
        >
          {
            getOptions()
          }
        </Select>
        <img src={searchIcon} alt="" />
      </span>

    )
  }
}

export default AutoSearchComponent
