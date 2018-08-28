# koa-params-validator
Koa2 请求参数校验中间件, 基于 [easy-object-validator](https://github.com/peakchen90/easy-object-validator) 校验

[![Build Status](https://travis-ci.org/peakchen90/koa-params-validator.svg?branch=master)](https://travis-ci.org/peakchen90/koa-params-validator)
[![Codecov](https://img.shields.io/codecov/c/github/peakchen90/koa-params-validator.svg)](https://codecov.io/gh/peakchen90/koa-params-validator)
[![npm](https://img.shields.io/npm/v/koa-params-validator.svg)](https://www.npmjs.com/package/koa-params-validator)
[![npm](https://img.shields.io/npm/dt/koa-params-validator.svg)](https://www.npmjs.com/package/koa-params-validator)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/peakchen90/koa-params-validator/blob/master/LICENSE)


## 安装
```bash
npm i -S koa-params-validator
```

## 快速开始
```js
const validator = require('koa-params-validator')
const app = new require('koa')();

// validator() 返回一个Koa2中间件方法，未通过校验的将返回 500 状态码
app.use(validator({
  query: {
    keyword: validator.string().isRequire()
  },
  body: {
    data: validator.arrayOf(validator.object())
  }
}))

// 在路由中使用
route.post('/login', validator({
  body: {
    username: validator.string().isRequire()
    password: validator.string().isRequire()
  }
}, {
  statsu: 200,
  state:{
    success: false,
    data: '用户名或密码不能为空'
  }
}), (ctx) => {
  // login...
})
```

## API
> 校验规则的API与 [easy-object-validator](https://github.com/peakchen90/easy-object-validator) 完全一致，请直接参考其用法

### **`validator`: Function(options, invalidMixinContext)**
  - {Object} options 校验规则，请参考 [easy-object-validator](https://github.com/peakchen90/easy-object-validator)
  - {Object} invalidMixinContext [可选] 未通过校验时将这个对象混合到Koa的context对象上，默认 status: 500, 默认 message: 'The parameter is invalid'
  - 返回一个Koa中间件


