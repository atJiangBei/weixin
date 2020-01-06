// pages/record/index.js
const request = require('../../request/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    total: 1,
    pages: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const user = wx.getStorageSync('user')
    request
      .queryAppointment({ openid: user.openid, query: { page: 1 } })
      .then(res => {
        const { docs, page, total, pages } = res
        this.setData({
          list: docs,
          page,
          total,
          pages
        })
      })
  },
  seeDetails() {
    wx.showToast({
      title: '暂未开放',
      icon: 'none'
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
  onShareAppMessage: function() {}
})
