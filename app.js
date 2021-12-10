// app.js
App({
  globalData: {
    grouplistpage: 0,
    grouplistlimit: 10,
    grouplist: [],
    grouplistcount: 0,

    personlistpage: 0,
    personlistlimit: 10,
    personlist: [],
    personlistcount: 0,

    page: 0,
    limit: 20,
    seepage: 0,
    seelimit: 10,
    seeuserList: [],
    seeuserListcount: 0,
    showcalendar: true,
    userInfo: {},
    toqrboxshowitem: {},

    userListcount: 0,
    detailinfo: {},
    userList: [],
    firstuserList: [],
    hasUserInfo: false,
    isdetailinfo: false,
  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
})