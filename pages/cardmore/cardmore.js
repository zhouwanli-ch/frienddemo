// pages/cardmore/cardmore.js
const app = getApp()
import {
  prod
} from '../../utils/env';
const {
  baseUrl
} = prod;
import {
  deletecardimages
} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    baseUrl: baseUrl,
    detailinfo: {},
    isdetailinfo: false,
  },
  editchange() {
    const that = this
    console.log(that.data.edit)
    that.setData({
      edit: !that.data.edit,
    })
  },
  previewCardImages(e) {
    let urls = e.currentTarget.dataset.current.map((item) => baseUrl + item.url)
    if (e.currentTarget.dataset.img) {
      wx.previewImage({
        current: e.currentTarget.dataset.img, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
    }
  },
  deleteImages(e) {
    const that = this
    console.log(e.currentTarget.dataset.item)
    wx.showModal({
      content: '确认要删除这1张照片吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          deletecardimages({
            openid: e.currentTarget.dataset.item.openid,
            url: e.currentTarget.dataset.item.url
          }).then(res => {
            console.log(res)
            if (res.data.success) {
              if (res.data.data.exist) {
                app.globalData.userInfo = res.data.data.usertable,
                  app.globalData.hasUserInfo = true
                that.setData({
                  detailinfo: app.globalData.userInfo,
                })
              } else {
                console.log(res.data.msg)
              }
            } else {
              console.log(res.data.msg)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  upCardImagesClick: function (e) {
    const that = this
    console.log(e, that.data.tempFilePaths)
    if (app.globalData.userInfo && app.globalData.userInfo.openid) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          let filePath = res.tempFilePaths;
          wx.uploadFile({
            url: baseUrl + "/uploadcardimages",
            filePath: filePath[0],
            name: 'file',
            formData: {
              'openid': app.globalData.userInfo.openid
            },
            success(res) {
              console.log(JSON.parse(res.data))
              if (JSON.parse(res.data).success) {
                app.globalData.userInfo = JSON.parse(res.data).data.usertable,
                  app.globalData.hasUserInfo = true
                that.setData({
                  detailinfo: app.globalData.userInfo,
                })
              } else {
                console.log(JSON.parse(JSON.parse(res.data).msg)) //接口返回值
              }
            }
          })
        },
        fail: function (e) {
          console.error(e)
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('监听页面加载')
    if (app.globalData.isdetailinfo) {
      this.setData({
        detailinfo: app.globalData.detailinfo,
        isdetailinfo: app.globalData.isdetailinfo
      })
    } else {
      this.setData({
        detailinfo: app.globalData.userInfo,
        isdetailinfo: app.globalData.isdetailinfo
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('监听页面初次渲染完成')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('监听页面显示')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('监听页面隐藏')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('监听页面卸载')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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