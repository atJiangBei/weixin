// pages/appointments/index.js
const getToken = require('../../request/getToken.js')
const request = require('../../request/index.js')
const util = require('../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    commodity: {},
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    recommender: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const data = JSON.parse(options.data)
    this.setData({
      commodity: data
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  nameChange(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneChange(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  addressChange(e) {
    this.setData({
      address: e.detail.value
    })
  },
  dateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  recommenderChange(e) {
    this.setData({
      recommender: e.detail.value
    })
  },
  timeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  verification() {
    const { name, phone, address, date, time } = this.data
    let str = ''
    if (!name) {
      return '请输入您的姓名'
    }
    if (!phone) {
      return '请输入您的电话号码'
    }
    if (!address) {
      return '请输入联系地址'
    }
    if (!date || !time) {
      return '请选择服务时间'
    }
    return true
  },
  appointment(e) {
    const result = this.verification()
    if (result !== true) {
      wx.showToast({
        title: result,
        icon: 'none'
      })
      return
    }
    const user = wx.getStorageSync('user')
    const tid = 'HWIv-fEMymRtTF__AjP31sWuKilWU4GnDWvCAlrXoTg'
    const { name, phone, address, date, time } = this.data
    const data = {
      name1: {
        value: name
      },
      thing2: {
        value: address
      },
      phone_number3: {
        value: phone
      },
      date5: {
        value: date + ' ' + time
      }
    }
    wx.requestSubscribeMessage({
      tmplIds: [tid],
      success: res => {
        if (res[tid] === 'accept') {
          getToken().then(res => {
            request
              .sendMessage({
                openid: user.openid,
                access_token: res,
                data: data
              })
              .then(() => {
                this.appointmentSave()
              })
          })
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  appointmentSave() {
    const user = wx.getStorageSync('user')
    const {
      commodity,
      recommender,
      name,
      phone,
      address,
      date,
      time
    } = this.data
    const userInfo = app.globalData.userInfo
    const data = {
      name,
      user_name: userInfo && userInfo.nickName,
      user_openid: user.openid,
      commodity: commodity,
      recommender: recommender,
      details: {
        name,
        phone,
        address,
        date: date + ' ' + time
      }
    }

    request.appointment(data).then(res => {
      wx.showToast({
        title: '预约成功'
      })
      wx.navigateTo({
        url: '../success/index'
      })
    })
  }
})
