module.exports = {
  get status() {
    return this.res.statusCode || '';
  },
  get message() {
    return this.res.statusMessage || '';
  },

  set status(code) {
    return this.res.statusCode = code;
  },
  set message(msg) {
    this.res.statusMessage = msg;
  }
};
  