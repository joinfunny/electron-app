var Waterline = require('waterline')
var Complaints = Waterline.Collection.extend({
  tableName: 'complaints',
  schema: true,
  connection: 'robot',
  autoPK: false,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  attributes: {
    docmentsNo: {
      type: 'string',
      required: true,
      unique: false,
      primaryKey: false,
      index: true
    },
    orderTime: {
      type: 'string'
    },
    agentOrderNo: {
      type: 'string'
    },
    feedback: {
      type: 'string'
    },
    coustomerRequest: {
      type: 'string'
    },
    phoneNo: {
      type: 'string'
    },
    type: {
      type: 'integer'
    },
    sign: {
      type: 'string'
    },
    // 投诉来源
    complaintSources: {
      type: 'string'
    },
    // 投诉时长
    timeLength: {
      type: 'string'
    },
    // 投诉次数
    times: {
      type: 'string'
    },
    // 满意度
    satisfaction: {
      type: 'string'
    },
    // 流转信息
    record: {
      type: 'string'
    }
    /* ,
    // 工单号
    orderId: {
      type: 'string'
    },
    // 工单时间
    createTime: {
      type: 'string'
    },
    // 订单号
    dealId: {
      type: 'string'
    },
    // 手机号
    dealMobile: {
      type: 'string'
    },
    // 订单状态
    dealState: {
      type: 'string'
    },
    // 业务类型
    orderType: {
      type: 'string'
    }, // 问题类型
    orderDesc: {
      type: 'string'
    }, // 联系方式
    userMobile: {
      type: 'string'
    } */
  }
})

module.exports = Complaints
