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

module.exports = {
  'GET /ds/db/preview': workSheetPreview,
  'POST /ds/db/conn': {
    name: "197ee1769aae11e8af630a58c0a80337.xlsx",
    origin_name: "HR(1)_258.xlsx"
  }
}