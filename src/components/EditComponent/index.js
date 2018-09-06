import React from 'react';
import _ from 'lodash'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import Dropdown from 'antd/lib/dropdown'
import 'antd/lib/dropdown/style/css'
import Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import dateIcon from 'assets/date.png'
import numberIcon from 'assets/number.png'
import stringIcon from 'assets/string.png'
import styles from './index.less'

const MenuItem = Menu.Item

const typeMap = {
  string: <img alt="" src={stringIcon} className={styles.typeIcon} />,
  number: <img alt="" src={numberIcon} className={styles.typeIcon} />,
  date: <img alt="" src={dateIcon} className={styles.typeIcon} />
}

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editVisible: false,
      changeType: null,
      changeName: null,
    }
    this.showEditIcon = this.showEditIcon.bind(this)
    this.hideEditIcon = this.hideEditIcon.bind(this)
    this.setEditMode = this.setEditMode.bind(this)
    this.setChangeName = this.setChangeName.bind(this)
    this.setChangeType = this.setChangeType.bind(this)
    this.resetState = this.resetState.bind(this)
    this.changeTableToColumns = this.changeTableToColumns.bind(this)
  }

  showEditIcon() {
    const { editing } = this.state;
    if (!editing) {
      this.setState({ editVisible: true })
    }
  }

  hideEditIcon() {
    const { editing } = this.state;
    if (!editing) {
      this.setState({ editVisible: false })
    }
  }

  setEditMode() {
    this.setState({ editing: true })
  }

  setChangeName(e) {
    this.setState({ changeName: e.target.value })
  }

  setChangeType({ key }) {
    this.setState({ changeType: key })
  }

  resetState() {
    this.setState({
      editing: false,
      editVisible: false,
      changeType: null,
      changeName: null,
    })
  }

  changeTableToColumns() {
    const { serial, tableName } = this.props;
    const { changeType, changeName } = this.state;
    if (changeName === '') {
      return;
    }
    const params = {}
    if (changeType !== null) {
      Object.assign(params, { data_type: changeType })
    }
    if (changeName !== null) {
      Object.assign(params, { nick_name: changeName })
    }
    this.props.changeTableToColumns({ tableName, serial, params })
    this.resetState()
  }

  render() {
    const { editVisible, editing, changeType, changeName } = this.state
    const { columns, serial } = this.props
    const currentColumn = _.get({ columns }, `columns[${serial}]`)
    const dataType = _.get(currentColumn, 'data_type')
    const name = _.get(currentColumn, 'nick_name')
    const menu = (
      <Menu
        onClick={this.setChangeType}
      >
        <MenuItem key="string"><img alt="" src={stringIcon} className={styles.typeIcon} />文本</MenuItem>
        <MenuItem key="number"><img alt="" src={numberIcon} className={styles.typeIcon} />数值</MenuItem>
        <MenuItem key="date"><img alt="" src={dateIcon} className={styles.typeIcon} />日期</MenuItem>
      </Menu>
    );
    return (
      <Row
        className={styles.container}
        onMouseEnter={this.showEditIcon}
        onMouseLeave={this.hideEditIcon}
      >
        {
          editing ? (
            <Dropdown
              overlay={menu}
              trigger={['click']}
            >
              <span>{typeMap[changeType || dataType]}<Icon type="down" /></span>
            </Dropdown>
          ) : <span>{typeMap[dataType]}</span>
        }
        {
          !editing ? (
            <div className={styles.nameField}>{name}</div>
          ) : (<input
            value={changeName !== null ? changeName : name}
            onChange={this.setChangeName}
          />)
        }
        {
          !editing ? (
            <button
              className={styles.clickItem}
              onClick={this.setEditMode}
              style={{ display: editVisible ? 'inline' : 'none' }}
            >
              <Icon type="edit" />
            </button>
          ) : (
            <span>
              <button
                className={styles.clickItem}
                onClick={this.changeTableToColumns}
              >
                <Icon type="check" />
              </button>
              <button
                className={styles.clickItem}
                onClick={this.resetState}
              >
                <Icon type="close" />
              </button>
            </span>
          )
        }
      </Row>
    )
  }
}

export default EditComponent