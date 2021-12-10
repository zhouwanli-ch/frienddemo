const app = getApp()

import {
  prod
} from '../../utils/env';
const {
  baseUrl
} = prod;
import {
  getusertable,
  newbacktime
} from "../../utils/api.js"
Page({
  data: {
    baseUrl: baseUrl,
    userInfo: {},
    code: '',
  },
  toCardMore() {
    wx.navigateTo({
      url: "/pages/cardmore/cardmore"
    })
  },
  previewImage(e) {
    console.log(e.currentTarget.dataset, e.currentTarget.dataset.current)
    if (e.currentTarget.dataset.img) {
      wx.previewImage({
        current: e.currentTarget.dataset.img, // 当前显示图片的http链接
        urls: e.currentTarget.dataset.current // 需要预览的图片http链接列表
      })
    }
  },
  previewCardImages(e) {
    let urls = e.currentTarget.dataset.current.map((item) => baseUrl + item.url)
    if (e.currentTarget.dataset.img) {
      wx.previewImage({
        current: e.currentTarget.dataset.img, // 当前显示图片的http链接
        urls: urls.reverse() // 需要预览的图片http链接列表
      })
    }
  },

  onLoad: function (options) {
    // console.log(options)
  },

  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    this.setData({
      userInfo: app.globalData.detailinfo,
    })
  },

  // 生命周期函数--监听页面隐藏
  onHide: function () {

  },

  // 生命周期函数--监听页面卸载
  onUnload: function () {

  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    // 调用刷新时将执行的方法
    this.onRefresh();
  },
  // 刷新
  onRefresh() {
    wx.showLoading({
      title: '刷新中...',
    })
    // 2. 隐藏loading 提示框
    wx.hideLoading();
    // 3. 停止下拉刷新，在需要刷新结束时调用该api，否则，页面将会保持下拉状态、不会回弹。
    wx.stopPullDownRefresh();
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: '扩列cp圈 -- 共享扩列群',
      imageUrl: '/assets/icon/sharephoto.jpg', //图片地址
      path: '/pages/hall/hall?jump=382739709', // 用户点击首先进入的当前页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:");
      }
    }
  },
  //用户点击右上角分享朋友圈
  onShareTimeline: function () {
    return {
      title: '扩列cp圈 -- 共享扩列群',
      imageUrl: '/assets/icon/sharephoto.jpg', //图片地址
      path: '/pages/hall/hall?jump=382739709', // 用户点击首先进入的当前页面
      success: function (res) {
        // 转发成功
        console.log("转发成功:");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:");
      }
    }
  },
})