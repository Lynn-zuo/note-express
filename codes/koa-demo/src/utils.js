// delegate 方法对 request 和 response 对象上面的事件和方法进行委托
module.exports.delegate = function Delegate(obj, property) {
    let setters = [];
    let getters = [];
    let listens = [];
  
    function listen(key) {
      Object.defineProperty(obj, key, {
        get() {
          return getters.includes(key) ? obj[property][key] : obj[key]; // 如果通过 getter 代理了，则返回对应 obj[property][key] 的值，否则返回 obj[key] 的值
        },
        set(val) {
          if (setters.includes(key)) {
            obj[property][key] = val; // 如果通过 setter 代理了，则设置对应 obj[property][key] 的值，否则设置 obj[key] 的值
          } else {
            obj[key] = val;
          }
        },
      });
    }
    // listen 函数在使用 getter 或者 setter 时，将对应的键添加到 setters 和 getters 中，让 obj 访问对应键时代理到 property 对应的键值
    this.getter = function (key) {
      getters.push(key);
      if (!listens.includes(key)) { // 防止重复调用listen
        listen(key);
        listens.push(key);
      }
      return this;
    };
  
    this.setter = function (key) {
      setters.push(key);
      if (!listens.includes(key)) { // 防止重复调用listen
        listen(key);
        listens.push(key);
      }
      return this;
    };
    return this;
};
  
// 实现洋葱模型
module.exports.compose = (middleware) => {
  return (ctx, next) => {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('error'));
      index = i;
      const cb = middleware[i] || next;
      if (!cb) return Promise.resolve();
      try {
        return Promise.resolve(
          cb(ctx, function next() {
            return dispatch(i + 1);
          })
        );
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};