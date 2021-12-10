//引入env中的url
import {
  prod
} from './env';
const {
  baseUrl
} = prod;

//专用域名
const SubDomain = 'xxx'

export function request(url, method, data, isSubDomain) {
  console.log('这是我的ajax请求', data);
  let _url = `${baseUrl}/${isSubDomain ? SubDomain : ''}${url}`;
  // console.log(_url)
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中'
    });

    wx.request({
      url: _url,
      data: data,
      method: method,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded'
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res)
        resolve(res);
        wx.hideLoading();
      },
      fail() {
        reject('接口请求错误');
      }
    });
  });
}