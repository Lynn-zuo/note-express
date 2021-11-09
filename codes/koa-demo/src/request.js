module.exports = {
  get header() {
    return this.req.headers
  },
  get method() {
    return this.req.method
  },
  get url() {
    return this.req.url
  },
  get query() {
    const arr = this.req.url.split('?');
    if (arr[1]) {
    const obj = {}; // 维护一个对象，存储query-value键值对
    arr[1].split('&').forEach((str) => {
    const param = str.split('=');
    obj[param[0]] = param[1];
    });
    return obj;
    }
    return {};
  }
};
  