# note-koa

Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。

koa API 总结

首先创建一个 koa 应用实例，koa() 函数是由 koa 模块导出的一个顶级函数。

```js
var koa = reqiure('koa')
var app = koa()
```

将中间件行为挂载到 koa 实例上，并将应用实例绑定到 3000 端口：

```js
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```