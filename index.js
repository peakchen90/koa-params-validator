const Validate = require('easy-object-validator/src/Validate');
const objectValidator = require('easy-object-validator');

/**
 * 请求参数校验
 * @param {Object} options 校验规则
 * @param {Object} [invalidMixinContext] 校验失败时，将合并到ctx
 * @returns {Function} Koa中间件
 */
function validator(options, invalidMixinContext) {
  return async (ctx, next) => {
    options = options || {};
    const target = ctx.request;
    const isValid = objectValidator(target, options);
    if (isValid) {
      await next();
    } else {
      if (Validate.type(invalidMixinContext) !== 'object') {
        invalidMixinContext = {}
      }
      Object.assign(ctx, {
        status: 500,
        message: 'The parameter is invalid'
      }, invalidMixinContext);
    }
  }
}


/**
 * 暴露方法
 */

// 继承，用于自定义校验方法
validator.extend = (options) => {
  // 执行 objectValidator 的继承方法
  objectValidator.extend(options);

  Object.keys(options).forEach(name => {
    // 添加引用
    validator[name] = objectValidator[name];
  });
}
// 添加引用
validator.string = objectValidator.string;
validator.number = objectValidator.number;
validator.object = objectValidator.object;
validator.array = objectValidator.array;
validator.boolean = objectValidator.boolean;
validator.isRequire = objectValidator.isRequire;
validator.test = objectValidator.test;
validator.is = objectValidator.is;
validator.not = objectValidator.not;
validator.arrayOf = objectValidator.arrayOf;
validator.oneOf = objectValidator.oneOf;
validator.reset = objectValidator.reset;


module.exports = validator;
