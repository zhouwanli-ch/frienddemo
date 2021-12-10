// pages/qrboxshow/qrboxshow.js
let videoAd = null
const app = getApp()
import {
  prod
} from '../../utils/env';
const {
  baseUrl
} = prod;
import {
  getgrouplistall
} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: baseUrl,
    toqrboxshowitem: {},
    showlist: [],
    cnaseegroup:false,
  },
  getgrouplistall() {
    getgrouplistall({
      state: 1,
      type: this.data.toqrboxshowitem.type,
      belongdate: this.data.toqrboxshowitem.belongdate,
    }).then(res => {
      this.setData({
        showlist: res.data.data,
      })
      // 2. 隐藏loading 提示框
      wx.hideLoading();
      // 3. 停止下拉刷新，在需要刷新结束时调用该api，否则，页面将会保持下拉状态、不会回弹。
      wx.stopPullDownRefresh();
    })
  },
  previewCardImages(e) {
    let urls = e.currentTarget.dataset.current.map((item) => baseUrl + item.imageurl)
    if (this.data.toqrboxshowitem.type === 'group' && !this.data.cnaseegroup) {
      wx.showModal({
        title: '解锁查看权限',
        content: '观看完整视频即可解锁本次所有群码，收集不易，敬请支持！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            if (videoAd) {
              videoAd.show().catch(() => {
                // 失败重试
                videoAd.load()
                  .then(() => videoAd.show())
                  .catch(err => {
                    console.log('激励视频 广告显示失败')
                    if (e.currentTarget.dataset.img) {
                      wx.previewImage({
                        current: e.currentTarget.dataset.img, // 当前显示图片的http链接
                        urls: urls // 需要预览的图片http链接列表
                      })
                    }
                  })
              })
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      if (e.currentTarget.dataset.img) {
        wx.previewImage({
          current: e.currentTarget.dataset.img, // 当前显示图片的http链接
          urls: urls // 需要预览的图片http链接列表
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-ecddded6c04db972'
      })
      videoAd.onLoad(() => {})
      videoAd.onError((err) => {
        this.setData({
          cnaseegroup: true,
        })
        wx.showToast({
          title: '解锁成功',
        })
      })
      videoAd.onClose((res) => {
        console.log(res,999)
        if(res.isEnded === true){
          this.setData({
            cnaseegroup: true,
          })
          wx.showToast({
            title: '解锁成功',
          })
        }
      })
    }
    this.setData({
      toqrboxshowitem: app.globalData.toqrboxshowitem
    })
    this.getgrouplistall()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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