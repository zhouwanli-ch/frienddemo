const app = getApp()

import {
  prod
} from '../../utils/env';
const {
  baseUrl
} = prod;
import {
  setusertable,
  changestate,
  newgetallusertable,
  getusertable,
  newbacktime
} from "../../utils/api.js"
Page({
  data: {
    showcalendar: true,
    threedaytime: 11638406907000,
    baseUrl: baseUrl,
    userInfo: {},
    hasUserInfo: false,
    code: '',
  },
  changestate(state) {
    changestate({
      state: state,
      openid: this.data.userInfo.openid
    }).then(res => {
      if (res.data.success) {
        app.globalData.userInfo = res.data.data.usertable,
          app.globalData.hasUserInfo = true,
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: app.globalData.hasUserInfo
          })
        wx.showToast({
          title: res.data.msg,
        })
        this.newgetallusertable(1)
      } else {
        console.log(res.data.msg)
      }
    })
  },
  newgetallusertable(state) {
    app.globalData.userListcount = 0;
    app.globalData.page = 1;
    app.globalData.firstuserList = []
    app.globalData.userList = []

    newgetallusertable({
      state: state,
      page: app.globalData.page,
      limit: app.globalData.limit,
    }).then(res => {
      if (res.data.success) {
        app.globalData.firstuserList = res.data.data
        app.globalData.userListcount = res.data.count
        let temp = [];
        let temp1 = [];
        for (let i = 0; i < app.globalData.firstuserList.length; i += 1) {
          i % 2 === 0 ? temp.push(app.globalData.firstuserList[i]) : temp1.push(app.globalData.firstuserList[i])
        }
        app.globalData.userList = temp.concat(temp1);
      } else {
        console.log(res.data.msg)
      }
    })
  },
  xcxuserstateChange() {
    if (app.globalData.userInfo && app.globalData.userInfo.openid) {
      if (app.globalData.userInfo.cardqrcodeUrl) {
        this.changestate(this.data.userInfo.xcxuserstate === 0 ? 1 : 0)
      } else {
        wx.showToast({
          title: '请先上传二维码',
        })
      }
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
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
  onTabItemTap(item) {
    if (!app.globalData.hasUserInfo) {
      wx.login({
        success: res => {
          this.setData({
            code: res.code,
          })
        }
      })
      wx.getUserProfile({
        desc: '用于展示用户信息',
        lang: 'zh_CN',
        success: (res) => {
          console.log("用户信息：", res.userInfo);
          setusertable({
            code: this.data.code,
            userInfo: res.userInfo
          }).then(res => {
            if (res.data.success) {
              app.globalData.userInfo = res.data.data.usertable,
                app.globalData.hasUserInfo = true,
                this.setData({
                  userInfo: app.globalData.userInfo,
                  hasUserInfo: app.globalData.hasUserInfo
                })
              wx.showToast({
                title: res.data.msg,
              })
            } else {
              wx.showToast({
                title: res.data.msg,
              })
            }
          })
        }
      }, )
    } else {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.hasUserInfo
      })
    }
  },
  toseelog() {
    wx.navigateTo({
      url: "/pages/seelog/seelog"
    })
    console.log(999888)
  },
  toEditMine() {
    app.globalData.detailinfo = app.globalData.userInfo,
      app.globalData.isdetailinfo = false
    wx.navigateTo({
      url: "/pages/editmine/editmine"
    })
  },
  toCardMore() {
    app.globalData.detailinfo = app.globalData.userInfo,
      app.globalData.isdetailinfo = false
    wx.navigateTo({
      url: "/pages/cardmore/cardmore"
    })
  },
  upCardQrCodeClick: function (e) {
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
            url: baseUrl + "/uploadcardqrcode",
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
                  userInfo: app.globalData.userInfo,
                  hasUserInfo: app.globalData.hasUserInfo
                })
                that.newgetallusertable(1)
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
  upCardImagesClick: function (e) {
    const that = this
    console.log(e, that.data.tempFilePaths)
    if (app.globalData.userInfo && app.globalData.userInfo.cardimagesUrl && app.globalData.userInfo.cardimagesUrl.length >= 9) {
      wx.showToast({
        title: '照片数量已上限！',
      })
    } else {
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
                    userInfo: app.globalData.userInfo,
                    hasUserInfo: app.globalData.hasUserInfo
                  })
                } else {
                  console.log(666, JSON.parse(JSON.parse(res.data).msg)) //接口返回值
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
    if (this.data.showcalendar) {
      if (Date.parse(new Date()) > this.data.threedaytime) {
        app.globalData.showcalendar = false,
          this.setData({
            showcalendar: app.globalData.showcalendar,
          });
      } else {
        newbacktime({}).then(res => {
          if (res.data.success) {
            if (Date.parse(new Date()) > res.data.data.time) {
              app.globalData.showcalendar = false,
                this.setData({
                  showcalendar: app.globalData.showcalendar,
                });
            }
          } else {
            console.log(res.data.msg)
          }
        })
      }
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
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
    wx.login({
      success: res => {
        getusertable({
          code: res.code
        }).then(res => {
          if (res.data.success) {
            if (res.data.data.exist) {
              app.globalData.userInfo = res.data.data.usertable,
                app.globalData.hasUserInfo = true
              this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: app.globalData.hasUserInfo
              })
            } else {
              console.log(res.data.msg)
            }
          } else {
            console.log(res.data.msg)
          }
          // 2. 隐藏loading 提示框
          wx.hideLoading();
          // 3. 停止下拉刷新，在需要刷新结束时调用该api，否则，页面将会保持下拉状态、不会回弹。
          wx.stopPullDownRefresh();
        })
      },
    })
  },

  // 页面上拉触底事件的处理函数
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