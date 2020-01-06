// pages/typeList/index.js
const request = require('../../request/index.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pages: 1,
    page: 1,
    total: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request
      .queryProduct({ type: options.type, query: { page: 1 } })
      .then(res => {
        const { page, pages, total, docs } = res
        this.setData({
          page,
          pages,
          total,
          list: docs
        })
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
