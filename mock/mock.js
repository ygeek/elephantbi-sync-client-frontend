const workSheetPreview = {
  ds_info: {},
  preview: [{
    table_name: 'worksheet1',
    rows_count: 2,
    columns: [{
      data_type: 'string', name: '姓名', nick_name: '姓名'
    }, {
      data_type: 'number', name: '年龄', nick_name: '年龄'
    }, {
      data_type: 'date', name: '出生日期', nick_name: '出生日期'
    }],
    records: [
      ['王帅', 25, '1993-08-17'],
      ['张三', 22, '1990-11-11']
    ]
  }, {
    table_name: 'worksheet2',
    rows_count: 2,
    columns: [{
      data_type: 'string', name: '姓名', nick_name: '姓名'
    }, {
      data_type: 'number', name: '年龄', nick_name: '年龄'
    }, {
      data_type: 'date', name: '出生日期', nick_name: '出生日期'
    }],
    records: [
      ['李四', 23, '1992-09-17'],
      ['王二麻子', 22, '1990-11-11']
    ]
  }]
}

const dashDetail = {
  can_edit: 1,
  charts_list: [],
  id: 5,
  is_owner_default: 0,
  name: '仪表盘详情',
  size: 1226,
  source_type: 5,
  owner: {
    id: 2,
    avatar: 'qrerwergregegr',
    name: 'wangshuai',
  },
  worksheet_count: 3,
  charts_count: 12,
  description: '我是数据源详情详情',
  share_list: [
    { id: 1, name: '樱木花道', avatar: null },
    { id: 2, name: '流川枫', avatar: null },
    { id: 3, name: '赤木刚宪', avatar: null },
    { id: 4, name: '三井寿', avatar: null },
    { id: 5, name: '宫城良田', avatar: null },
  ],
  user: {
    avatar: null,
    name: '王帅',
    id: 1
  },
  update_at: '2018-05-28T02:34:40.755133+00:00',
  tables: [{
    table_name: 'worksheet1',
    rows_count: 2,
    table_id: 1,
    columns: [{
      data_type: 'string', name: '姓名', nick_name: '姓名'
    }, {
      data_type: 'number', name: '年龄', nick_name: '年龄'
    }, {
      data_type: 'date', name: '出生日期', nick_name: '出生日期'
    }],
    records: [
      ['王帅', 25, '1993-08-17'],
      ['张三', 22, '1990-11-11']
    ]
  }]
}

const tableIds = [
  { name: '订单', id: 1 },
  { name: '销售额', id: 2 },
  { name: '人员', id: 3 }
]

module.exports = {
  'GET /ds/db/preview': workSheetPreview,
  'POST /ds/db/conn': {
    name: "197ee1769aae11e8af630a58c0a80337.xlsx",
    origin_name: "HR(1)_258.xlsx"
  },
  'GET /ds/:id': dashDetail,
  'GET /ds/:id/tables': tableIds
}