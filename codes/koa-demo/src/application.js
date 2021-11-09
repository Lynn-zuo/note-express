const http = require('http');
const _context = require('./context');
const _request = require('./request');
const _response = require('./response');
const { compose } = require('./utils');

class MyKoa {

  constructor() {
    this.middleware = [];
  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      const ctx = this.createContext(req, res); // 创建上下文，将http请求和app实例的req和res挂载到ctx上
      const fn = compose(this.middleware); // compose实现洋葱圈模型
      fn(ctx).then(() => { // 全部中间件执行完毕后，返回相应信息
        res.end(ctx.body);
      }).catch((err) => {
        throw err;
      });
    });
    // server.listen(...args);
    return server.listen(...args);
  }

  use(callback) {
    this.middleware.push(callback); // use方法添加调用中间件
  }

  createContext(req, res) {
    const ctx = Object.assign(_context);
    const request = Object.assign(_request);
    const response = Object.assign(_response);
    ctx.request = request;
    ctx.response = response;
    ctx.req = request.req = req;
    ctx.res = response.res = res;
    return ctx;
  }
}

module.exports = MyKoa;
