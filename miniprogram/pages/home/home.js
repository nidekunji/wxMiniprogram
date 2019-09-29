// pages/home/home.js
const app = getApp()
import {
  Service
} from '../../untils/cloudFuc.js'
Page({
  data: {
    userInfo: {},
    searchValue: "",
    recommendList: []
  },

  onLoad: function() {
    if (app.isLogin) {
      this.lateInit()
    }
  },
  lateInit() {
    //请求首页数据
    this.getPostList()
  },
  _curPage: 1,
  getPostList(init) {
    // wx.showLoading({
    //   title: '加载中...',
    // })
    Service.getPostList(init ? 1 : this._curPage).then((res) => {
      this.setData({
        recommendList: res
      })
    })
  },
  onSearch() {
    if (!this.searchValue) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: "none"
      })
      return
    }
  },
  onInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
  }
  // 上传图片
  // doUpload: function() {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function(res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]

  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath

  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },
})