import React from 'react';
import _ from 'lodash'
import EditComponent from '../EditComponent'
import styles from './index.less'

const DataSourceTable = ({
  tableName,
  dataSource,
  columns,
  sublimeData,
  dispatch,
  tableToColumns,
  changeTableToColumns
}) => {
  const getThead = () => {
    return _.map(columns, (item, index) => {
      return (
        <td key={index}>
          <EditComponent
            key={index}
            columns={tableToColumns}
            serial={index}
            tableName={tableName}
            changeTableToColumns={changeTableToColumns}
          />
        </td>
      )
    })
  }
  const getTbody = () => {
    const getTrData = (data) => {
      return _.map(data, (item, index) => {
        return <td key={index}>{item}</td>
      })
    }
    return _.map(dataSource, (trData, index) => {
      return (
        <tr key={index}>{getTrData(trData)}</tr>
      )
    })
  }
  return (
    <div className={styles.scrollContainer}>
      <table>
        <thead>
          <tr>{getThead()}</tr>
        </thead>
        <tbody>
          {getTbody()}
        </tbody>
      </table>
    </div>
  )
}

export default DataSourceTable