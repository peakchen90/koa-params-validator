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
    data:validator.arrayOf(validator.object())
  }
}))

```

## API
> 校验规则的API与 [easy-object-validator](https://github.com/peakchen90/easy-object-validator) 完全一致，请直接参考其用法

### **`validator`: Function(options, mixinContext)**
  - {Object} options 校验规则，请参考 easy-object-validator
  - {Object} mixinContext [可选] 混合到Koa的context对象上，默认 status: 500, 默认 message: 'The parameter is invalid'
  - 返回一个Koa中间件


