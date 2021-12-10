const app = getApp()
const util = require("../../utils/util.js");
let interstitialAd = null

import {
  prod
} from '../../utils/env';
const {
  baseUrl
} = prod;
import {
  uploadgroupqrcode,
  getusertable,
  newbacktime,
  deletegroup,
  approvegrouplist,
  creategroup,
  getgrouplist,
  getgrouphistorylist,
  getgrouppersonlist
} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: "",
    hdeg: 0, //时针旋转角度
    mdeg: 0, //分针旋转角度
    sdeg: 0, //秒针旋转角度
    flag: "none", //获取到时间后再显示页面
    showcalendar: true,
    threedaytime: 11638406907000,

    formObj: {
      personimageurl: '',
      groupimageurl: '',
      operateopenid: ''
    },
    role: 'user',
    baseUrl: baseUrl,
    active: '交友墙',
    grouplist: [],
    personlist: [],

    grouplisthistorypage: 0,
    grouplisthistorylimit: 20,
    grouplisthistorycount: 0,
    historylist: [],

    grouplistapprovepage: 0,
    grouplistapprovelimit: 20,
    grouplistapprovecount: 0,
    approvelist: [],
    hiddenmodalput: true,
    approvechoose: 'unpass',
    opinion: '',
    approveobj: {},
    approveitems: [{
        value: 'pass',
        name: '通过',
      },
      {
        value: 'unpass',
        name: '不通过'
      },
    ],

    login: false
  },
  toapprove(e) {
    this.setData({
      hiddenmodalput: false,
      opinion: '',
      approveobj: e.currentTarget.dataset.item
    })

    console.log(e.currentTarget.dataset.item)
  },
  radioChange(e) {
    this.setData({
      approvechoose: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.approveitems
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      approveitems: items
    })
  },
  opinionChange(e) {
    this.setData({
      opinion: e.detail.value,
    })
  },
  approvecancel() {
    this.setData({
      hiddenmodalput: true
    })
  },
  approveconfirm() {
    this.setData({
      hiddenmodalput: true
    })
    this.approvegrouplist()
    console.log(this.data.approveobj)
  },
  approvegrouplist() {
    approvegrouplist({
      state: this.data.approvechoose === 'pass' ? 1 : -1,
      rowid: this.data.approveobj.rowid,
      type: this.data.approveobj.type,
      opinion: this.data.opinion
    }).then(res => {
      if (res.data.success) {
        this.setData({
          approvelist: [],
          grouplistapprovepage: 0,
          grouplistapprovecount: 0
        })
        this.getgroupapprovelist()
      } else {
        console.log(res.data.msg)
      }
      wx.showToast({
        title: res.data.msg,
      })
    })
  },
  upCardImagesClick: function (e) {
    console.log(e.currentTarget.dataset.type)
    const that = this
    if (app.globalData.userInfo && app.globalData.userInfo.openid) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          let filePath = res.tempFilePaths;
          wx.uploadFile({
            url: baseUrl + "/uploadgroupqrcode",
            filePath: filePath[0],
            name: 'file',
            success(res) {
              console.log(JSON.parse(res.data))
              if (JSON.parse(res.data).success) {
                if (e.currentTarget.dataset.type === 'person') {
                  that.setData({
                    ['formObj.personimageurl']: JSON.parse(res.data).data.imageurl
                  })
                } else {
                  that.setData({
                    ['formObj.groupimageurl']: JSON.parse(res.data).data.imageurl
                  })
                }

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
  toqrboxshow(e) {
    console.log(e.currentTarget.dataset.item)
    app.globalData.toqrboxshowitem = e.currentTarget.dataset.item
    wx.navigateTo({
      url: "/pages/qrboxshow/qrboxshow"
    })
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
      ['formObj.personimageurl']: '',
      ['formObj.groupimageurl']: '',
      ['formObj.operateopenid']: app.globalData.userInfo.openid,
    })
    this.setData({
      active: e.currentTarget.dataset.name
    })
    if (e.currentTarget.dataset.name === '投稿记录') {
      console.log(app.globalData.userInfo.openid)
      if (app.globalData.userInfo.openid && this.data.role === 'user') {
        this.setData({
          historylist: [],
          grouplisthistorypage: 0,
          grouplisthistorycount: 0
        })
        this.getgrouphistorylist()
      } else if (app.globalData.userInfo.openid && this.data.role === 'admin') {
        this.setData({
          approvelist: [],
          grouplistapprovepage: 0,
          grouplistapprovecount: 0
        })
        this.getgroupapprovelist()
      } else {
        wx.showToast({
          title: '请先登录',
        })
      }
    } else if (e.currentTarget.dataset.name === '扩列群' && app.globalData.grouplist.length <= 0) {
      this.getgrouppersonlist('group')
    }
  },
  deletegroup(e) {
    console.log(e.currentTarget.dataset.item)
    deletegroup({
      imageurl: e.currentTarget.dataset.item.imageurl,
    }).then(res => {
      if (res.data.success) {
        wx.showToast({
          title: res.data.msg,
        })
      } else {
        console.log(res.data.msg)
      }
    })
  },
  savegroup(e) {
    if ((this.data.formObj.groupimageurl && e.currentTarget.dataset.type === 'group') || (this.data.formObj.personimageurl && e.currentTarget.dataset.type === 'person')) {
      creategroup({
        type: e.currentTarget.dataset.type,
        imageurl: e.currentTarget.dataset.type === 'group' ? this.data.formObj.groupimageurl : this.data.formObj.personimageurl,
        openid: this.data.formObj.operateopenid,
      }).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: res.data.msg,
          })
          this.setData({
            active: '投稿记录',
            historylist: [],
            grouplisthistorypage: 0,
            grouplisthistorycount: 0
          })
          this.getgrouphistorylist()
        } else {
          console.log(res.data.msg)
        }
      })
    } else {
      wx.showToast({
        title: '群二维码不能为空',
      })
    }
  },
  getgrouphistorylist() {
    this.data.grouplisthistorypage += 1;
    getgrouphistorylist({
      openid: app.globalData.userInfo.openid,
      page: this.data.grouplisthistorypage,
      limit: this.data.grouplisthistorylimit,
    }).then(res => {
      this.setData({
        historylist: this.data.historylist.concat(res.data.data),
        grouplisthistorycount: res.data.count
      })
      // 2. 隐藏loading 提示框
      wx.hideLoading();
      // 3. 停止下拉刷新，在需要刷新结束时调用该api，否则，页面将会保持下拉状态、不会回弹。
      wx.stopPullDownRefresh();
    })
  },
  getgroupapprovelist() {
    this.data.grouplistapprovepage += 1;
    getgrouplist({
      state: 0,
      page: this.data.grouplistapprovepage,
      limit: this.data.grouplistapprovelimit,
    }).then(res => {
      this.setData({
        approvelist: this.data.approvelist.concat(res.data.data),
        grouplistapprovecount: res.data.count
      })
      // 2. 隐藏loading 提示框
      wx.hideLoading();
      // 3. 停止下拉刷新，在需要刷新结束时调用该api，否则，页面将会保持下拉状态、不会回弹。
      wx.stopPullDownRefresh();
    })
  },
  getgrouppersonlist(type) {
    type === 'group' ? app.globalData.grouplistpage += 1 : app.globalData.personlistpage += 1;
    getgrouppersonlist({
      type: type,
      page: (type === 'group' ? app.globalData.grouplistpage : app.globalData.personlistpage),
      limit: (type === 'group' ? app.globalData.grouplistlimit : app.globalData.personlistlimit),
    }).then(res => {
      type === 'group' ? app.globalData.grouplist = app.globalData.grouplist.concat(res.data.data) : app.globalData.personlist = app.globalData.personlist.concat(res.data.data)
      type === 'group' ? app.globalData.grouplistcount = res.data.count : app.globalData.personlistcount = res.data.count
      if (type === 'group') {
        this.setData({
          grouplist: app.globalData.grouplist
        })
      } else {
        this.setData({
          personlist: app.globalData.personlist
        })
      }
      // 2. 隐藏loading 提示框
      wx.hideLoading();
      // 3. 停止下拉刷新，在需要刷新结束时调用该api，否则，页面将会保持下拉状态、不会回弹。
      wx.stopPullDownRefresh();
    })
  },
  getgrouplist() {
    app.globalData.grouplistpage += 1;
    getgrouplist({
      page: app.globalData.grouplistpage,
      limit: app.globalData.grouplistlimit,
    }).then(res => {
      app.globalData.grouplist = app.globalData.grouplist.concat(res.data.data)
      app.globalData.grouplistcount = res.data.count
      this.setData({
        grouplist: app.globalData.grouplist
      })
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
                ['formObj.personimageurl']: '',
                ['formObj.groupimageurl']: '',
                ['formObj.operateopenid']: app.globalData.userInfo.openid,
              })
              this.setData({
                role: app.globalData.userInfo ? app.globalData.userInfo.role : 'user',
              })
            } else {
              console.log(res.data.msg)
            }
          } else {
            console.log(res.data.msg)
          }
        })
      },
    })

    app.globalData.grouplistpage = 0
    app.globalData.grouplist = []
    app.globalData.grouplistcount = 0

    app.globalData.personlistpage = 0
    app.globalData.personlist = []
    app.globalData.personlistcount = 0


    this.getgrouppersonlist('person')

    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-73a7f3c3245023f0'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
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
      const that = this;
      setInterval(function () {
        const _currentTime = util.formatTime(new Date()).split(" ")[1];
        const _hdeg = _currentTime.split(":")[0] * 30;
        const _mdeg = _currentTime.split(":")[1] * 6;
        const _sdeg = _currentTime.split(":")[2] * 6;
        that.setData({
          currentTime: _currentTime,
          hdeg: _hdeg,
          mdeg: _mdeg,
          sdeg: _sdeg,
          flag: "block"
        });
      }, 1000)
    }
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
    if (this.data.active === '扩列群') {
      app.globalData.grouplistpage = 0
      app.globalData.grouplistcount = 0
      app.globalData.grouplist = [],
        this.setData({
          ['formObj.operateopenid']: app.globalData.userInfo.openid,
        })
      this.getgrouppersonlist('group')
    } else if (this.data.active === '交友墙') {
      app.globalData.personlistpage = 0
      app.globalData.personlistcount = 0
      app.globalData.personlist = [],
        this.setData({
          ['formObj.operateopenid']: app.globalData.userInfo.openid,
        })
      this.getgrouppersonlist('person')
    } else if (this.data.active === '投稿记录') {
      if (app.globalData.userInfo.openid) {
        if (this.data.role === 'user') {
          this.setData({
            historylist: [],
            grouplisthistorypage: 0,
            grouplisthistorycount: 0
          })
          this.getgrouphistorylist()
        } else if (this.data.role === 'admin') {
          this.setData({
            approvelist: [],
            grouplistapprovepage: 0,
            grouplistapprovecount: 0
          })
          this.getgroupapprovelist()
        }
      } else {
        wx.showToast({
          title: '请先登录',
        })
      }
    }

  },

  lower(e) {
    if (this.data.active === '扩列群') {
      // 调用刷新时将执行的方法
      wx.showLoading({
        title: '加载中...',
      })
      if (app.globalData.grouplistcount > app.globalData.grouplist.length) {
        this.getgrouppersonlist('group')
      } else {
        wx.showToast({
          title: '已到达底部',
        })
      }
    } else if (this.data.active === '交友墙') {
      // 调用刷新时将执行的方法
      wx.showLoading({
        title: '加载中...',
      })
      if (app.globalData.personlistcount > app.globalData.personlist.length) {
        this.getgrouppersonlist('person')
      } else {
        wx.showToast({
          title: '已到达底部',
        })
      }
    } else if (this.data.active === '投稿记录') {
      // 调用刷新时将执行的方法
      wx.showLoading({
        title: '加载中...',
      })
      if (this.data.grouplisthistorycount > this.data.historylist.length) {
        this.getgrouphistorylist()
      } else {
        wx.showToast({
          title: '已到达底部',
        })
      }
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