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
import uuid from 'uuid'
import numberIcon from 'assets/number.png'
import stringIcon from 'assets/string.png'
import styles from './index.less'

const MenuItem = Menu.Item

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editVisible: false,
      changeType: null,
      changeName: null,
      idMap: uuid()
    }
    this.showEditIcon = this.showEditIcon.bind(this)
    this.hideEditIcon = this.hideEditIcon.bind(this)
    this.setEditMode = this.setEditMode.bind(this)
    this.setChangeName = this.setChangeName.bind(this)
    this.setChangeType = this.setChangeType.bind(this)
    this.resetState = this.resetState.bind(this)
    this.changeTableToColumns = this.changeTableToColumns.bind(this)
    this.clickDocument = this.clickDocument.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.clickDocument)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickDocument)
  }

  setChangeType({ key }) {
    this.setState({ changeType: key })
  }

  setChangeName(e) {
    this.setState({ changeName: e.target.value })
  }

  setEditMode() {
    this.setState({ editing: true })
  }

  hideEditIcon() {
    const { editing } = this.state;
    if (!editing) {
      this.setState({ editVisible: false })
    }
  }

  showEditIcon() {
    const { editing } = this.state;
    if (!editing) {
      this.setState({ editVisible: true })
    }
  }

  resetState() {
    this.setState({
      editing: false,
      editVisible: false,
      changeType: null,
      changeName: null
    })
  }

  clickDocument(e) {
    const { idMap } = this.state
    const { values } = Object;
    const id = e.target.getAttribute('id')
    const classes = e.target.getAttribute('class') || ''
    if (idMap !== id && classes.indexOf('ant-dropdown-menu-item') === -1) {
      this.resetState()
    }
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
    const { editVisible, editing, changeType, changeName, idMap } = this.state
    const typeMap = {
      string: <img id={idMap} alt="" src={stringIcon} className={styles.typeIcon} />,
      number: <img id={idMap} alt="" src={numberIcon} className={styles.typeIcon} />,
      date: <img id={idMap} alt="" src={dateIcon} className={styles.typeIcon} />
    }
    const { columns, serial, canEdit = true } = this.props
    const currentColumn = _.get({ columns }, `columns[${serial}]`)
    const dataType = _.get(currentColumn, 'data_type')
    const name = _.get(currentColumn, 'nick_name')
    const menu = (
      <Menu
        onClick={this.setChangeType}
      >
        <MenuItem key="string" id={idMap}><img id={idMap} alt="" src={stringIcon} className={styles.typeIcon} />文本</MenuItem>
        <MenuItem key="number" id={idMap}><img id={idMap} alt="" src={numberIcon} className={styles.typeIcon} />数值</MenuItem>
        <MenuItem key="date" id={idMap}><img id={idMap} alt="" src={dateIcon} className={styles.typeIcon} />日期</MenuItem>
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
              <span id={idMap}>{typeMap[changeType || dataType]}<Icon type="down" id={idMap} /></span>
            </Dropdown>
          ) : <span>{typeMap[dataType]}</span>
        }
        {
          !editing ? (
            <div className={styles.nameField}>{name}</div>
          ) : (<input
            value={changeName !== null ? changeName : name}
            onChange={this.setChangeName}
            id={idMap}
          />)
        }
        {
          !editing && canEdit ? (
            <button
              id={idMap}
              className={styles.clickItem}
              onClick={this.setEditMode}
              style={{ display: editVisible ? 'inline' : 'none' }}
            >
              <Icon type="edit" id={idMap} />
            </button>
          ) : null
        }
        {
          editing && canEdit ? (
            <span>
              <button
                id={idMap}
                className={styles.clickItem}
                onClick={this.changeTableToColumns}
              >
                <Icon type="check" id={idMap} />
              </button>
              <button
                id={idMap}
                className={styles.clickItem}
                onClick={this.resetState}
              >
                <Icon type="close" id={idMap} />
              </button>
            </span>
          ) : null
        }
      </Row>
    )
  }
}

export default EditComponent