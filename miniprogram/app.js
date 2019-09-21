//app.js
App({
  onLaunch: function () {
    this.isLogin = false
    this.globalData.windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度    
    this.globalData.windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度  
    let userInfo;
    if (userInfo = wx.getStorageSync('userInfo')) {
      this.globalData.userInfo = userInfo;
    }
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
