import postgresql from 'assets/postgreSQL.svg'
import mysql from 'assets/mysql-logo.svg'
import mssql from 'assets/microsoftsql-logo.svg'
import oracle from 'assets/oracle.svg'
import excel from 'assets/excel.jpeg'
import csv from 'assets/csv.jpeg'
import sqlite from 'assets/SQLite.png'
import sybase from 'assets/sybase-logo.png'
import firebird from 'assets/Firebird_logo.png'
import failure from 'assets/failure.png'
import inSync from 'assets/in_sync.png'
import offline from 'assets/offline.svg'
import success from 'assets/success.png'
import toBeConfirm from 'assets/to_be_confirmed.png'
import waiting from 'assets/waiting.png'

export const syncStatusMap = {
  0: { name: '离线', icon: offline },
  1: { name: '同步待确认', icon: toBeConfirm },
  2: { name: '等待同步', icon: waiting },
  3: { name: '同步中', icon: inSync },
  4: { name: '同步正常', icon: success },
  5: { name: '同步失败', icon: failure },
  6: { name: '同步异常', icon: failure }
}

export const example = []

export const dslistMap = {
  0: { icon: csv, name: 'Csv' },
  1: { icon: excel, name: 'Excel' },
  2: { icon: mysql, name: 'MySQL' },
  3: { icon: postgresql, name: 'PostgreSQL' },
  4: { icon: mssql, name: 'MicrosoftSQL' },
  5: { icon: oracle, name: 'Oracle' },
  6: { icon: oracle, name: '多表联合' },
  7: { icon: sqlite, name: 'SQLite' },
  8: { icon: sybase, name: 'SyBase' },
  9: { icon: firebird, name: 'Firebird' }
}

export const isSyncing = (status) => {
  if ([2, 3, 4].includes(status)) {
    return true
  }
  return false
}

export const isDataBase = (sourceType) => {
  if ([2, 3, 4, 5, 7, 8, 9].includes(sourceType)) {
    return true
  }
  return false
}

export const menuConfig = (syncStatus, source, sourceType) => ([{
  title: '查看详细信息', key: 'detail', auth: source === 'list'
}, {
  title: '立即触发同步', key: 'trigger', auth: [2, 4, 6].includes(syncStatus) && isDataBase(sourceType)
}, {
  title: '停止同步', key: 'stop', auth: [2, 3, 4, 6].includes(syncStatus) && isDataBase(sourceType)
}, {
  title: '开启同步', key: 'start', auth: [0, 5].includes(syncStatus) && isDataBase(sourceType)
}, {
  title: '同步确认', key: 'confirm', auth: [1].includes(syncStatus) && isDataBase(sourceType)
}, {
  title: '编辑', key: 'edit', auth: true
}, {
  title: '转让', key: 'transfer', auth: true
}, {
  title: '删除', key: 'delete', auth: true
}])