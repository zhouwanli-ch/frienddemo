import {
  prod
} from '../../utils/env';

// let interstitialAd = null

const {
  baseUrl
} = prod;
const app = getApp()
import {
  getusertable,
  newgetallusertable,
  getusercardimages,
  updatehallTime,
  newbacktime,
} from "../../utils/api.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showcalendar: true,
    threedaytime: 11638406907000,
    baseUrl: baseUrl,
    counts: 100,
    scrolltoupper: true,
    userList: [],

    text: "请文明使用，禁止发布有违反国家法律以及公共道德的信息，违规者将予以封禁处理，严重者将移交公安机关处理。",
    marqueePace: 0.8, //滚动速度
    marqueeDistance: 0, //初始滚动距离
    marquee_margin: 30,
    size: 14,
    timer: null,
    interval: 20 // 时间间隔
  },
  todetail(e) {
    if (app.globalData.hasUserInfo && app.globalData.userInfo && app.globalData.userInfo.openid) {
      app.globalData.detailinfo = e.currentTarget.dataset.item,
        app.globalData.isdetailinfo = true
      getusercardimages({
        openid: e.currentTarget.dataset.item.openid,
        seepersonopenid: app.globalData.userInfo.openid,
        seepersonxcxname: app.globalData.userInfo.xcxname,
        seepersonxcxsex: app.globalData.userInfo.xcxsex,
        seepersonxcxavatarUrl: app.globalData.userInfo.avatarUrl,
        seepersonxcxavatar: app.globalData.userInfo.xcxavatar,
        state: 0
      }).then(res => {
        if (res.data.success) {
          console.log(res)
          app.globalData.detailinfo.cardimagesUrl = res.data.data
          wx.navigateTo({
            url: "/pages/persondetail/persondetail"
          })
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
  onTabItemTap(item) {
    this.setData({
      userList: app.globalData.userList,
    })
  },
  topMessage() {
    const that = this
    wx.showModal({
      content: '确认要推荐自己的信息吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.updatehallTime()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  tohbb() {
    wx.switchTab({
      url: "/pages/blackboard/blackboard"
    })
  },
  updatehallTime() {
    if (app.globalData.userInfo && app.globalData.userInfo.openid) {
      if (new Date().getTime() - new Date(app.globalData.userInfo.hallTime).getTime() >= 300000) {
        updatehallTime({
          openid: app.globalData.userInfo.openid
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
            this.onRefresh()
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        })
      } else {
        wx.showToast({
          title: '推送过于频繁',
        })
      }
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
  },
  previewImage(e) {
    console.log(app.globalData.hasUserInfo, app.globalData.userInfo.openid)
    if (app.globalData.hasUserInfo && app.globalData.userInfo && app.globalData.userInfo.openid) {
      if (e.currentTarget.dataset.item.cardqrcodeUrl) {
        getusercardimages({
          openid: e.currentTarget.dataset.item.openid,
          seepersonopenid: app.globalData.userInfo.openid,
          seepersonxcxname: app.globalData.userInfo.xcxname,
          seepersonxcxsex: app.globalData.userInfo.xcxsex,
          seepersonxcxavatarUrl: app.globalData.userInfo.avatarUrl,
          seepersonxcxavatar: app.globalData.userInfo.xcxavatar,
          state: 0
        }).then(res => {
          if (res.data.success) {
            console.log(res)
            let urls = res.data.data.map((item) => baseUrl + item.url)
            urls.unshift(baseUrl + e.currentTarget.dataset.item.cardqrcodeUrl)
            wx.previewImage({
              current: baseUrl + e.currentTarget.dataset.item.cardqrcodeUrl, // 当前显示图片的http链接
              urls: urls // 需要预览的图片http链接列表
            })
          } else {
            console.log(res.data.msg)
          }
        })
      } else {
        console.log(e.currentTarget.dataset.item)
      }
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }

  },
  newgetallusertable(state) {
    app.globalData.page += 1;
    newgetallusertable({
      state: state,
      page: app.globalData.page,
      limit: app.globalData.limit,
    }).then(res => {
      if (res.data.success) {
        app.globalData.firstuserList = app.globalData.firstuserList.concat(res.data.data)
        app.globalData.userListcount = res.data.count
        let temp = [];
        let temp1 = [];
        for (let i = 0; i < app.globalData.firstuserList.length; i += 1) {
          i % 2 === 0 ? temp.push(app.globalData.firstuserList[i]) : temp1.push(app.globalData.firstuserList[i])
        }
        app.globalData.userList = temp.concat(temp1);
        this.setData({
          userList: app.globalData.userList,
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
    this.onRefresh();
    // wx.login({
    //   success: res => {
    //     getusertable({
    //       code: res.code
    //     }).then(res => {
    //       if (res.data.success) {
    //         if (res.data.data.exist) {
    //           app.globalData.userInfo = res.data.data.usertable,
    //             app.globalData.hasUserInfo = true
    //         } else {
    //           console.log(res.data.msg)
    //         }
    //       } else {
    //         console.log(res.data.msg)
    //       }
    //     })
    //   },
    // })
    // if (wx.createInterstitialAd) {
    //   interstitialAd = wx.createInterstitialAd({
    //     adUnitId: 'adunit-73a7f3c3245023f0'
    //   })
    //   interstitialAd.onLoad(() => {})
    //   interstitialAd.onError((err) => {})
    //   interstitialAd.onClose(() => {})
    // }
    // if (interstitialAd) {
    //   interstitialAd.show().catch((err) => {
    //     console.error(err)
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(Date.parse(new Date()), Date.parse(new Date()) + 1 * 24 * 60 * 60 * 1000)
    this.setData({
      userList: app.globalData.userList,
    })
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
    var that = this;
    clearInterval(that.data.timer);
    that.data.timer = null
    var length = that.data.text.length * that.data.size; //文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt(); // 第一个字消失后立即从右边出现
  },

  scrolltxt: function () {
    var that = this;
    var length = that.data.length; //滚动文字的宽度
    var windowWidth = that.data.windowWidth; //屏幕宽度
    if (length > windowWidth) {
      that.data.timer = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin; //滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) { //判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        } else {
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(that.data.timer);
          that.data.timer = null
          that.scrolltxt();
        }
      }, that.data.interval);
    } else {
      that.setData({
        marquee_margin: "1000"
      }); //只显示一条不滚动右边间距加大，防止重复显示
    }
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    // 调用刷新时将执行的方法
    this.onRefresh();
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    // 调用刷新时将执行的方法
    wx.showLoading({
      title: '加载中...',
    })
    if (app.globalData.userListcount > app.globalData.userList.length) {
      this.newgetallusertable(1)
    } else {
      wx.showToast({
        title: '已到达底部',
      })
    }
    console.log('触底')
  },
  // 刷新
  onRefresh() {
    wx.showLoading({
      title: '刷新中...',
    })
    app.globalData.userListcount = 0;
    app.globalData.page = 0;
    app.globalData.firstuserList = []
    app.globalData.userList = []
    this.setData({
      userList: app.globalData.userList
    })
    this.newgetallusertable(1)
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