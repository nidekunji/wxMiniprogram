const db = wx.cloud.database()
const PAGE_COUNT = 10
wx.cloud.init({
  env: 'test-cc8d29'
})
export class Service {
  static getPostList(page) {
    return new Promise((resolve, reject) => {
      db.collection('post').skip((page - 1) * PAGE_COUNT).limit(PAGE_COUNT).get().then((res) => {
        console.log('获取页面列表数据:',res.data)
        resolve( res.data)
      })
    })
  }
}