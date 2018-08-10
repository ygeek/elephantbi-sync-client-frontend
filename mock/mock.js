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

const dataSource = {
  "list": [
    {
      "client": 0,
      "can_delete": true, 
      "charts_count": 1, 
      "created_at": "2018-05-29T08:42:36.777669+00:00", 
      "description": "This is a test Excel DataSource", 
      "id": 1, 
      "name": "Supermarket data source", 
      "rows_count": 10302, 
      "shared_groups_list": [], 
      "shared_users_list": [], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 1, 
          "name": "订单"
        }, 
        {
          "id": 2, 
          "name": "销售人员"
        }, 
        {
          "id": 3, 
          "name": "退货"
        }
      ], 
      "updated_at": "2018-05-29T08:42:36.777688+00:00", 
      "user": {
        "avatar": "", 
        "email": "chenjun@visionpsn.com", 
        "fake_email": 0, 
        "id": 1, 
        "is_admin": 1, 
        "mobile": null, 
        "name": "chenjun", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 3
    }, 
    {
      "client": 1,
      "can_delete": true, 
      "charts_count": 0, 
      "created_at": "2018-05-29T08:42:42.839947+00:00", 
      "description": "This is a test Excel DataSource", 
      "id": 2, 
      "name": "Supermarket data source", 
      "rows_count": 10302, 
      "shared_groups_list": [], 
      "shared_users_list": [], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 4, 
          "name": "订单"
        }, 
        {
          "id": 5, 
          "name": "销售人员"
        }, 
        {
          "id": 6, 
          "name": "退货"
        }
      ], 
      "updated_at": "2018-05-29T08:42:42.839964+00:00", 
      "user": {
        "avatar": "", 
        "email": "chenjun@visionpsn.com", 
        "fake_email": 0, 
        "id": 1, 
        "is_admin": 1, 
        "mobile": null, 
        "name": "chenjun", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 3
    }, 
    {
      "client": 1,
      "can_delete": true, 
      "charts_count": 0, 
      "created_at": "2018-05-29T08:42:45.770070+00:00", 
      "description": "This is a test Excel DataSource", 
      "id": 3, 
      "name": "Supermarket data source", 
      "rows_count": 10302, 
      "shared_groups_list": [], 
      "shared_users_list": [], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 7, 
          "name": "订单"
        }, 
        {
          "id": 8, 
          "name": "销售人员"
        }, 
        {
          "id": 9, 
          "name": "退货"
        }
      ], 
      "updated_at": "2018-05-29T08:42:45.770081+00:00", 
      "user": {
        "avatar": "", 
        "email": "chenjun@visionpsn.com", 
        "fake_email": 0, 
        "id": 1, 
        "is_admin": 1, 
        "mobile": null, 
        "name": "chenjun", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 3
    }, 
    {
      "client": 1,
      "can_delete": true, 
      "charts_count": 0, 
      "created_at": "2018-05-29T08:42:48.610053+00:00", 
      "description": "This is a test Excel DataSource", 
      "id": 4, 
      "name": "Supermarket data source", 
      "rows_count": 10302, 
      "shared_groups_list": [], 
      "shared_users_list": [], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 10, 
          "name": "订单"
        }, 
        {
          "id": 11, 
          "name": "销售人员"
        }, 
        {
          "id": 12, 
          "name": "退货"
        }
      ], 
      "updated_at": "2018-05-29T08:42:48.610064+00:00", 
      "user": {
        "avatar": "", 
        "email": "chenjun@visionpsn.com", 
        "fake_email": 0, 
        "id": 1, 
        "is_admin": 1, 
        "mobile": null, 
        "name": "chenjun", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 3
    }, 
    {
      "client": 0,
      "can_delete": true, 
      "charts_count": 0, 
      "created_at": "2018-05-29T08:43:08.785312+00:00", 
      "description": "This is a test Excel DataSource", 
      "id": 5, 
      "name": "Supermarket data source", 
      "rows_count": 10302, 
      "shared_groups_list": [], 
      "shared_users_list": [
        {
          "avatar": "", 
          "email": "chenjun@visionpsn.com", 
          "fake_email": 0, 
          "id": 1, 
          "is_admin": 1, 
          "mobile": null, 
          "name": "chenjun", 
          "verified": 1
        }
      ], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 13, 
          "name": "订单"
        }, 
        {
          "id": 14, 
          "name": "销售人员"
        }, 
        {
          "id": 15, 
          "name": "退货"
        }
      ], 
      "updated_at": "2018-05-29T08:43:08.785325+00:00", 
      "user": {
        "avatar": "", 
        "email": "q@visionpsn.com", 
        "fake_email": 0, 
        "id": 2, 
        "is_admin": 0, 
        "mobile": null, 
        "name": "Q", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 3
    }, 
    {
      "client": 0,
      "can_delete": true, 
      "charts_count": 0, 
      "created_at": "2018-06-06T02:57:31.142443+00:00", 
      "description": null, 
      "id": 8, 
      "name": "测试-文本格式日期数据识别（含混淆列）", 
      "rows_count": 5, 
      "shared_groups_list": [], 
      "shared_users_list": [], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 22, 
          "name": "Sheet1"
        }
      ], 
      "updated_at": "2018-06-06T02:57:31.142460+00:00", 
      "user": {
        "avatar": "", 
        "email": "chenjun@visionpsn.com", 
        "fake_email": 0, 
        "id": 1, 
        "is_admin": 1, 
        "mobile": null, 
        "name": "chenjun", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 1
    }, 
    {
      "client": 1,
      "can_delete": true, 
      "charts_count": 0, 
      "created_at": "2018-06-06T03:03:49.994567+00:00", 
      "description": null, 
      "id": 9, 
      "name": "测试-文本格式日期数据识别（含混淆列）", 
      "rows_count": 5, 
      "shared_groups_list": [], 
      "shared_users_list": [], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 23, 
          "name": "Sheet1"
        }
      ], 
      "updated_at": "2018-06-06T03:03:49.994585+00:00", 
      "user": {
        "avatar": "", 
        "email": "chenjun@visionpsn.com", 
        "fake_email": 0, 
        "id": 1, 
        "is_admin": 1, 
        "mobile": null, 
        "name": "chenjun", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 1
    }, 
    {
      "client": 0,
      "can_delete": true, 
      "charts_count": 0, 
      "created_at": "2018-06-06T03:04:52.378280+00:00", 
      "description": null, 
      "id": 10, 
      "name": "测试-文本格式日期数据识别（含混淆列）", 
      "rows_count": 5, 
      "shared_groups_list": [], 
      "shared_users_list": [], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 24, 
          "name": "Sheet1"
        }
      ], 
      "updated_at": "2018-06-06T03:04:52.378297+00:00", 
      "user": {
        "avatar": "", 
        "email": "chenjun@visionpsn.com", 
        "fake_email": 0, 
        "id": 1, 
        "is_admin": 1, 
        "mobile": null, 
        "name": "chenjun", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 1
    }, 
    {
      "client": 1,
      "can_delete": true, 
      "charts_count": 1, 
      "created_at": "2018-06-06T03:06:06.159517+00:00", 
      "description": null, 
      "id": 11, 
      "name": "测试-文本格式日期数据识别（含混淆列）", 
      "rows_count": 5, 
      "shared_groups_list": [], 
      "shared_users_list": [], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 25, 
          "name": "Sheet1"
        }
      ], 
      "updated_at": "2018-06-06T03:06:06.159536+00:00", 
      "user": {
        "avatar": "", 
        "email": "chenjun@visionpsn.com", 
        "fake_email": 0, 
        "id": 1, 
        "is_admin": 1, 
        "mobile": null, 
        "name": "chenjun", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 1
    }, 
    {
      "client": 1,
      "can_delete": true, 
      "charts_count": 0, 
      "created_at": "2018-08-07T09:04:28.666484+00:00", 
      "description": "This is a test Excel DataSource", 
      "id": 12, 
      "name": "Supermarket data source", 
      "rows_count": 10302, 
      "shared_groups_list": [], 
      "shared_users_list": [], 
      "source_type": 1, 
      "sync_status": 4, 
      "tables": [
        {
          "id": 26, 
          "name": "订单-new"
        }, 
        {
          "id": 27, 
          "name": "销售人员-new"
        }, 
        {
          "id": 28, 
          "name": "退货-new"
        }
      ], 
      "updated_at": "2018-08-07T09:04:28.666555+00:00", 
      "user": {
        "avatar": "", 
        "email": "chenjun@visionpsn.com", 
        "fake_email": 0, 
        "id": 1, 
        "is_admin": 1, 
        "mobile": null, 
        "name": "chenjun", 
        "verified": 1, 
        "wx_user_info": {}
      }, 
      "worksheet_count": 3
    }
  ], 
  "meta": {
    "current_page": 1, 
    "page_count": 1, 
    "page_size": 20, 
    "total_count": 10
  }
}

module.exports = {
  'GET /ds/db/preview': workSheetPreview,
  'GET /ds/list': dataSource,
  'POST /ds/db/conn': {
    name: "197ee1769aae11e8af630a58c0a80337.xlsx",
    origin_name: "HR(1)_258.xlsx"
  },
  'GET /ds/:id': dashDetail,
  'GET /ds/:id/tables': tableIds,

}