const app = getApp()

import {
  prod
} from '../../utils/env';
const {
  baseUrl
} = prod;
import {
  getSeelog,
  openidgetusertable,
  getusercardimages
} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: baseUrl,
    userInfo: {},
    hasUserInfo: false,
    active: '谁看过我',
    page: 1,
    limit: 20,
    seeloglist: []
  },
  todetail(e) {
    console.log(e, 999)
    if (app.globalData.hasUserInfo && app.globalData.userInfo && app.globalData.userInfo.openid) {

      openidgetusertable({
        openid: this.data.active === '谁看过我' ? e.currentTarget.dataset.item.seepersonopenid : e.currentTarget.dataset.item.beseepersonopenid,
      }).then(res => {
        if (res.data.success) {
          if (res.data.data.exist) {
            app.globalData.detailinfo = res.data.data.usertable,
              app.globalData.isdetailinfo = true
            getusercardimages({
              openid: this.data.active === '谁看过我' ? e.currentTarget.dataset.item.seepersonopenid : e.currentTarget.dataset.item.beseepersonopenid,
              seepersonopenid: app.globalData.userInfo.openid,
              seepersonxcxname: app.globalData.userInfo.xcxname,
              seepersonxcxsex: app.globalData.userInfo.xcxsex,
              seepersonxcxavatarUrl: app.globalData.userInfo.avatarUrl,
              seepersonxcxavatar: app.globalData.userInfo.xcxavatar,
              state: 0
            }).then(res => {
              if (res.data.success) {
                console.log(app.globalData.detailinfo, 996696)
                app.globalData.detailinfo.cardimagesUrl = res.data.data
                wx.navigateTo({
                  url: "/pages/persondetail/persondetail"
                })
              } else {
                console.log(res.data.msg)
              }
            })
          } else {
            console.log(res.data.msg)
          }

        } else {
          console.log(res.data.msg)
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
  },
  previewImage(e) {
    if (e.currentTarget.dataset.img) {
      wx.previewImage({
        current: e.currentTarget.dataset.img, // 当前显示图片的http链接
        urls: e.currentTarget.dataset.current // 需要预览的图片http链接列表
      })
    }
  },
  changeActive(e) {
    this.setData({
      active: e.currentTarget.dataset.name
    })
    app.globalData.seepage = 0
    app.globalData.seeuserList = []
    this.setData({
      seeloglist: app.globalData.seeuserList
    })
    this.getSeelog()
  },
  getSeelog() {
    app.globalData.seepage += 1;
    getSeelog({
      active: this.data.active,
      openid: this.data.userInfo.openid,
      page: app.globalData.seepage,
      limit: app.globalData.seelimit,
    }).then(res => {
      if (res.data.success) {
        app.globalData.seeuserList = app.globalData.seeuserList.concat(res.data.data)
        app.globalData.seeuserListcount = res.data.count
        this.setData({
          seeloglist: app.globalData.seeuserList
        })
      } else {
        console.log(res.data.msg)
      }
      // 2. 隐藏loading 提示框
      wx.hideLoading();
      // 3. 停止下拉刷新，在需要刷新结束时调用该api，否则，页面将会保持下拉状态、不会回弹。
      wx.stopPullDownRefresh();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.seepage = 0
    app.globalData.seeuserList = []
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
    this.getSeelog()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  lower(e) {
    // 调用刷新时将执行的方法
    wx.showLoading({
      title: '加载中...',
    })
    if (app.globalData.seeuserListcount > app.globalData.seeuserList.length) {
      this.getSeelog()
    } else {
      wx.showToast({
        title: '已到达底部',
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底')
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