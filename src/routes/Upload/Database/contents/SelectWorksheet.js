import React from 'react';
import Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
import Checkbox from 'antd/lib/checkbox'
import 'antd/lib/checkbox/style/css'
import _ from 'lodash'
import DataSourceTable from 'components/DataSourceTable'
import styles from './index.less'

const { TabPane } = Tabs;

class SelectWorksheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '0'
    }
    this.changeActiveKey = this.changeActiveKey.bind(this)
  }

  changeActiveKey(activeKey) {
    this.setState({ activeKey })
  }

  render() {
    const { dataSource, dispatch, sublimeData, changeTableToColumns } = this.props;
    const { activeKey } = this.state;
    const currentDataSource = _.get(dataSource[activeKey], 'records', [])
    const currentColumn = _.get(dataSource[activeKey], 'columns', [])
    const currentTableName = _.get(dataSource[activeKey], 'table_name', null)
    return (
      <Row className={styles.selectWorksheet}>
        <Tabs
          activeKey={activeKey}
          tabPosition="right"
          onChange={this.changeActiveKey}
        >
          {
            dataSource.map((item, index) => {
              const i = index
              return (<TabPane tab={item.table_name} key={i} />)
            })
          }
          </Tabs>
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