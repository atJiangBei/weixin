import Request from './request.js'
module.exports = {
  queryProduct(data) {
    //查询商品
    return Request({
      url: '/IntimateAdmin/query/commodity',
      data,
      method: 'GET'
    })
  },
  login(data) {
    return Request({
      url: '/IntimateAdmin/login',
      data,
      method: 'GET'
    })
  },
  getOpenid(data) {
    //获取openid  session_key
    return Request({
      url: '/IntimateAdmin/getOpenid',
      data,
      method: 'GET'
    })
  },
  sendMessage(data) {
    //推送订阅消息（预约消息）
    return Request({
      url: '/IntimateAdmin/sendMessage',
      data,
      method: 'GET'
    })
  },
  appointment(data) {
    //预约成功，增加订单,预约记录
    return Request({
      url: '/IntimateAdmin/add/appointment',
      data,
      method: 'GET'
    })
  },
  queryAppointment(data) {
    return Request({
      url: '/IntimateAdmin/query/appointment',
      data,
      method: 'GET'
    })
  }
}
