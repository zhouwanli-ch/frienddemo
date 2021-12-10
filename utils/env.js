//设置公共访问的url.即环境地址

//commonJS规范--node.js采用的就是该规范  引入：require
module.exports = {
  //开发环境
  dev: {
    baseUrl: 'https://www.tagewangluo.com:7002' //例子
  },
  //测试环境
  test: {
    baseUrl: 'https://www.tagewangluo.com:7002' //例子
  },
  //线上环境（公共部分）
  prod: {
    baseUrl: 'https://www.tagewangluo.com:7002'
  }
}
//ES6  module --Vue中通常采用ES6的模块化规范  引入：import2.