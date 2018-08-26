const objectValidator = require('easy-object-validator');

/**
 * 请求参数校验
 * @param {String} type 请求类型 ['query', 'body', 'header', ...]
 * @param {Object} options 校验规则
 * @param {Object} [invalidContext] 校验失败时，将合并到ctx
 * @returns {Function} Koa中间件
 */
function validator(type, options, invalidContext) {
  return async (ctx, next) => {
    const target = ctx.request[type];
    options = options || {};
    const isValid = objectValidator(target, options);
    if (isValid) {
      await next();
    } else {
      if (Validate.type(invalidContext) !== 'object') {
        invalidContext = {}
      }
      Object.assign(ctx, {
        status: 500,
        message: 'The parameter is invalid'
      }, invalidContext);
    }
  }
}

module.exports = validator;
