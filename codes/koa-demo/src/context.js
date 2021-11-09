const { delegate } = require('./utils');

const context = (module.exports = {
  get body() {
    return this._body;
  },

  set body(value) {
    this._body = value;
  },
});
// 使用 delegate 对 request 和 response 进行代理
delegate(context, 'request').getter('header');
delegate(context, 'request').getter('method');
delegate(context, 'request').getter('url');
delegate(context, 'request').getter('query');
delegate(context, 'response').getter('status').setter('status');
delegate(context, 'response').getter('message').setter('message');
