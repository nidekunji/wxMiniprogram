// components/getUserInfo/getUserInfo.js
var app = getApp();
Component({
  properties: {
    showGetUserInfo: {
      type: Boolean,
      value: false
    }
  },

  data: {
    showGetUserInfo: false,
    showSettingTip: false,
    showNoLoginTip: false,
    appLogo: ''
  },
  ready: function() {
    // 获取当前基础库版本
    let nowVersion = wx.getSystemInfoSync().SDKVersion || '2.0.7';
    nowVersion = nowVersion.replace(/\./g, "");
    let use = nowVersion > 207;

    this.setData({
      canIUseButtonOpenSetting: use
    })
  },
  methods: {
    // 拒绝去授权
    refuseGetInfo: function() {
      this.setData({
        showNoLoginTip: true,
        showGetUserInfo: false
      });
    },
    // 获取用户信息
    bindGetUserInfo: function(e) {
      if (/getUserInfo:fail/.test(e.detail.errMsg)) {
        this.setData({
          showSettingTip: true,
          showGetUserInfo: false,
          showNoLoginTip: false
        });
      } else {
        this.setData({
          showSettingTip: false,
          showGetUserInfo: false,
          showNoLoginTip: false
        });
      }
    },
    // 打开设置
    openSetting: function() {
      let that = this;
      app.globalData.isOpenSettingBack = true;
      wx.openSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo'] === true) {
            that.setData({
              showSettingTip: false,
              showNoLoginTip: false,
              showGetUserInfo: false
            });
          }
        }
      })
    },
    // 按钮打开设置
    buttonOpenSetting: function(res) {
      let that = this;
      if (res.detail.authSetting['scope.userInfo'] === true) {
        that.setData({
          showSettingTip: false,
          showNoLoginTip: false,
          showGetUserInfo: false
        });
      }
    },
    // 拒绝去授权
    cancelSetting: function() {
      this.setData({
        showSettingTip: false,
        showNoLoginTip: true
      });
    },
    // 再次拒绝登录
    refuseLogin: function() {
      let pages = getCurrentPages();
      if (pages.length > 1) {
        app._logining = false;
      }
    }
  }
})