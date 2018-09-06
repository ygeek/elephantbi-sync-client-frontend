import React from 'react';
import Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import Checkbox from 'antd/lib/checkbox'
import 'antd/lib/checkbox/style/css'
import _ from 'lodash'
import Footer from '../../Footer';
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

  UNSAFE_componentWillMount() {
    const { sublimeData, filterTableList } = this.props;
    const tableNames = _.get(sublimeData, 'table_names', []);
    const plainOptions = tableNames.map(item => item.old_table_name)
    this.setState({
      checkedList: filterTableList,
      indeterminate: false,
      checkAll: filterTableList.length === plainOptions.length
    });
  }

  onChange(checkedList) {
    const { sublimeData } = this.props;
    const tableNames = _.get(sublimeData, 'table_names', []);
    const plainOptions = tableNames.map(item => item.old_table_name)
    this.props.changeFilterTableList(checkedList)
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length
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
      checkAll: e.target.checked
    });
  }

  changeActiveKey(activeKey) {
    this.setState({ activeKey })
  }


  render() {
    const {
      dataSource,
      sublimeData,
      changeTableToColumns,
      goPrev,
      goAfter
    } = this.props;
    const { activeKey } = this.state;
    const currentDataSource = _.get(dataSource[activeKey], 'records', [])
    const currentColumn = _.get(dataSource[activeKey], 'columns', [])
    const currentTableName = _.get(dataSource[activeKey], 'table_name', null)
    const tableNames = _.get(sublimeData, 'table_names', [])
    return (
      <Row className={styles.selectWorksheet}>
        <div className={styles.wrapper}>
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
                  <button
                    className={styles.checkItem}
                    key={index}
                    onClick={() => {
                      this.changeActiveKey(`${index}`)
                    }}
                  >
                    <Checkbox
                      value={item.old_table_name}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    />
                    <span
                      className={styles.checkButton}
                      style={activeKey === `${index}` ? { color: '#1890ff' } : null}
                    >
                      {item.old_table_name}
                    </span>
                  </button>
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
              tableToColumns={_.get(sublimeData, `table_to_columns[${currentTableName}]`)}
              changeTableToColumns={changeTableToColumns}
            />
          </div>
        </div>
        <Footer
          text1="上一步"
          text2="下一步"
          click1={goPrev}
          click2={() => {
            goAfter();
          }}
        />
      </Row>
    )
  }
}

export default SelectWorksheet