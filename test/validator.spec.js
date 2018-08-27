const validator = require('../index')

describe('basic', () => {
  let next, ctx = {}
  beforeEach(() => {
    next = jest.fn();
    ctx.request = {
      query: {
        foo: 'Alice',
        bar: 19
      },
      body: {
        uuid: '12341241212',
        data: {
          list: ['Bob', 'Cindy', 'Jerry']
        }
      },
      header: {
        token: 'Token-abc123=='
      }
    }
  })

  test('basic usage', () => {
    validator({
      query: {
        foo: validator.string().isRequire(),
        bar: validator.number().isRequire()
      }
    })(ctx, next)
    expect(next).toHaveBeenCalled()
  })

  test('basic usage 2', () => {
    validator({
      query: validator.object(),
      body: {
        uuid: validator.test(/\w+/),
        data: {
          list: validator.arrayOf(validator.string())
        },
      },
      header: {
        token: validator.oneOf(validator.string(), validator.number()).isRequire()
      }
    })(ctx, next)
    expect(next).toHaveBeenCalled()
  })

  test('basic usage 3', () => {
    validator({
      query: {
        foo: validator.not().string()
      },
    })(ctx, next)
    expect(next).not.toHaveBeenCalled()
    expect(ctx.status).toBe(500)
    expect(ctx.message).toBe('The parameter is invalid')
  })

  test('basic usage 4', () => {
    validator({
      query: {
        foo: validator.not().string()
      },
    }, {
      status: 404,
      state: {
        data: 'invalid'
      }
    })(ctx, next)
    expect(ctx.status).toBe(404)
    expect(ctx.state.data).toBe('invalid')
  })
})

describe('extend', () => {
  let next, ctx = {}
  beforeEach(() => {
    next = jest.fn();
    ctx.request = {
      body: {
        uuid: '12341241212',
        data: {
          list: ['Bob', 'Cindy', 'Jerry']
        }
      }
    }
  })

  test('extend baisc', () => {
    validator.extend({
      isUUID(v) {
        return /^\w+$/.test(v)
      }
    })
    validator({
      body: {
        uuid: validator.isUUID().isRequire()
      }
    })(ctx, next)
    expect(next).toHaveBeenCalled()
  })

  test('extend other', () => {
    expect(() => validator.extend({
      length() {}
    })).toThrowError()
  })
})
