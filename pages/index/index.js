//index.js
//获取应用实例
const request = require('../../request/index.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperList: [1, 2, 3, 4, 5],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    navList: [
      {
        title: '社区店',
        type: 'shequ',
        img: './../../static/images/shequ.png'
      },
      {
        title: '家居百货',
        type: 'baihuo',
        img: './../../static/images/jiaju.png'
      },
      {
        title: '家庭维修',
        type: 'weixiu',
        img: './../../static/images/weixiu.png'
      },
      {
        title: '其他服务',
        type: 'other',
        img: './../../static/images/other.png'
      }
    ],
    list: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.queryRecommend()
  },
  onShow: function() {
    this.queryRecommend()
  },
  queryRecommend(page = 1) {
    request.queryProduct({ query: { page } }).then(res => {
      this.setData({
        list: res.docs
      })
    })
  },
  toDetails(e) {
    //console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../details/index'
    })
  },
  toAppointment(e) {
    //console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url:
        '../appointments/index?data=' +
        JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  seeListFromType(e) {
    //console.log(e.currentTarget.dataset.type)
    wx.navigateTo({
      url: '../typeList/index?type=' + e.currentTarget.dataset.type
    })
  }
})
