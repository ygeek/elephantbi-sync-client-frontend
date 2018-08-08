import React from 'react';
import Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import Checkbox from 'antd/lib/checkbox'
import 'antd/lib/checkbox/style/css'
import _ from 'lodash'
import DataSourceTable from 'components/DataSourceTable'
import styles from './index.less'

const CheckboxGroup = Checkbox.Group;

class SelectWorksheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '0',
      indeterminate: true,
      checkAll: false,
      checkedList: [],
    }
    this.changeActiveKey = this.changeActiveKey.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCheckAllChange = this.onCheckAllChange.bind(this)
  }

  changeActiveKey(activeKey) {
    this.setState({ activeKey })
  }

  onChange(checkedList) {
    const { sublimeData } = this.props;
    const tableNames = _.get(sublimeData, 'table_names', []);
    const plainOptions = tableNames.map(item => item.old_table_name)
    this.props.changeFilterTableList(checkedList)
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }

  onCheckAllChange = (e) => {
    const { sublimeData } = this.props;
    const tableNames = _.get(sublimeData, 'table_names', []);
    const plainOptions = tableNames.map(item => item.old_table_name)
    this.props.changeFilterTableList(e.target.checked ? plainOptions : [])
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }


  render() {
    const { dataSource, dispatch, sublimeData, changeTableToColumns } = this.props;
    const { activeKey } = this.state;
    const currentDataSource = _.get(dataSource[activeKey], 'records', [])
    const currentColumn = _.get(dataSource[activeKey], 'columns', [])
    const currentTableName = _.get(dataSource[activeKey], 'table_name', null)
    console.log('000', sublimeData)
    const tableNames = _.get(sublimeData, 'table_names', [])
    return (
      <Row className={styles.selectWorksheet}>
        <div className={styles.checkboxGroup}>
          <div className={styles.checkItem}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
                全部
            </Checkbox>
          </div>
          <CheckboxGroup
            onChange={this.onChange}
            value={this.state.checkedList}
          >
            {
              tableNames.map((item, index) => (
                <div className={styles.checkItem}>
                  <Checkbox
                    value={item.old_table_name}
                  >
                    <button
                      className={styles.checkButton}
                      style={activeKey === `${index}` ? { borderBottom: '1px solid #1890ff' } : null}
                      onClick={() => {
                        this.changeActiveKey(`${index}`)
                      }}
                    >
                      {item.old_table_name}
                    </button>
                  </Checkbox>
                </div>
              ))
            }
          </CheckboxGroup>
        </div>
        <div
          className={styles.dataTable}
        >
          <DataSourceTable
            columns={currentColumn}
            dataSource={currentDataSource}
            tableName={currentTableName}
            sublimeData={sublimeData}
            dispatch={dispatch}
            changeTableToColumns={changeTableToColumns}
          />
        </div>
      </Row>
    )
  }
}

export default SelectWorksheet