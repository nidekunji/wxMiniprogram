//app.js
App({
  onLaunch: function() {
    this.globalData = {}
    this.isLogin = false
    this.globalData.windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度    
    this.globalData.windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度  
    let userInfo;
    if (userInfo = wx.getStorageSync('userInfo')) {
      this.globalData.userInfo = userInfo;
    }
    console.log(this.globalData, '全局数据');

    this.checkUserAuth().then((res) => {
      console.log('已经授权')
    }).catch(() => {})
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },
  _login(userInfo) {
    let self = this
    this.globalData.userInfo = userInfo
    this.showLoading({
      title: '登陆中...'
    })
    wx.login({
      success: (res) => {

      }
    })
  },
  checkUserAuth() {
    let self = this
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              lang: 'zh_CN',
              success: function(msg) {
                resolve(msg.userInfo)
              },
              fail: function(msg) {
                reject()
                // console.log('getUserInfo fail');
              }
            })
          } else {
            let pageInstance = self.getAppCurrentPage();
            pageInstance.setData({
              showGetUserInfo: true
            });
            reject()
          }
        }
      })
    })
  },

  // 展示提醒文字
  hideToast: function() {
    wx.hideToast();
  },
  showLoading: function(param) {
    wx.showLoading({
      title: param.title,
      success: function(res) {
        typeof param.success == 'function' && param.success(res);
      },
      fail: function(res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function(res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  hideLoading: function() {
    wx.hideLoading();
  },
  // 展示确认弹窗
  showModal: function(param) {
    wx.showModal({
      title: param.title || '提示',
      content: param.content,
      showCancel: param.showCancel || false,
      cancelText: param.cancelText || '取消',
      cancelColor: param.cancelColor || '#000000',
      confirmText: param.confirmText || '确定',
      confirmColor: param.confirmColor || '#3CC51F',
      success: function(res) {
        if (res.confirm) {
          typeof param.confirm == 'function' && param.confirm(res);
        } else {
          typeof param.cancel == 'function' && param.cancel(res);
        }
      },
      fail: function(res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function(res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  getAppCurrentPage: function() {
    let pages = getCurrentPages();
    return pages[pages.length - 1];
  },
  globalData: {
    userInfo: null,
    onLogin: false,
    isLogin: false,
  },
})