# note-koa

Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。

首先创建一个 koa 应用实例，koa() 函数是由 koa 模块导出的一个顶级函数。

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

这里的 Koa 应用程序不是 HTTP 服务器的1对1展现, 可以将一个或多个 Koa 应用程序安装在一起以形成具有单个HTTP服务器的更大应用程序。

## 一. koa 示例相关 API

1. app.callback()

返回适用于 http.createServer() 方法的回调函数来处理请求。你也可以使用此回调函数将 koa 应用程序挂载到 Connect/Express 应用程序中。

2. app.use()

将给定的中间件方法添加到此应用程序。app.use() 返回 this, 因此可以链式表达。

3. app.keys

设置签名的 Cookie 密钥。

4. app.context

app.context 是从其创建 ctx 的原型。可以通过编辑 app.context 为 ctx 添加其他属性。一般用于将 ctx 添加到整个应用程序中使用的属性或方法。

ctx 上的许多属性都是使用 getter ，setter 和 Object.defineProperty() 定义的。只能通过在 app.context 上使用 Object.defineProperty() 来编辑这些属性（不推荐）.

## 二. 上下文(context) 及其 API

1. ctx.req  - node 的 request 对象

2. ctx.res  - node 的 response 对象

3. ctx.reques  - koa 的 response 对象

4. ctx.response  - koa 的 response 对象

5. ctx.state - 用于通过中间件传递状态数据信息

6. ctx.cookies.get(name, [options])

7. ctx.cookies.set(name, value, [options])

## 三. request 相关 API

Koa Request 对象是在 node 的 原生请求对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。

1. request.header  - 请求头对象
2. request.method  - 请求方法
3. request.path  - 请求路径名
4. request.url  - 请求URL

其他API

## 四. response 相关API

Koa Response 对象是在 node 的原生响应对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。

1. response.header  - 响应头对象
2. response.status  - 响应状态
3. response.body  - 响应主体
4. response.message  - 响应消息

其他API