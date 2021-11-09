# express 和 koa 的前世今生

koa 官网对于 koa 的简介是这样的: 基于node.js 平台的下一代 web 开发框架.

众所周知, koa 框架出现在 express 之后, 并且 Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造.

那么, koa 与 exress 有哪些相同之处?  koa 比 express 又做了哪些优化呢?


## express 与 koa 的相同

1. express 与 koa 同样是 web 开发框架, 具有相同的开发团队.

2. 两个框架都对http进行了封装, 创建一个基础的 Web 服务都非常简单，写法也基本相同, 相关的api都差不多。

```js
// Express
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)
```

```js
// Koa
var koa = require('koa')
var route = require('koa-route')

var app = koa()

app.use(route.get('/', function *(){
  this.body = 'Hello World'
}))

app.listen(3000)
```

## express 与 koa 的不同

1. 路由处理与视图渲染等特性, Express 是自身集成的，而 Koa 需要引入中间件.

如上创建 web 服务所示, express 内部集成了路由处理, 而koa 需要要通过引入路由中间件实现.

2. 异步流程控制 - Express 采用 callback 来处理异步，Koa v1 采用 generator，Koa v2 采用 async/await

js 中 callback、promise、generator、async/await 这四种异步流程控制，generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise，async/await 在语义化上又要比 generator 更强。

express通过回调实现异步函数，在多个回调、多个中间件中写起来容易逻辑混乱

```js
// express写法
app.get('/test', function (req, res) {
    fs.readFile('/file1', function (err, data) {
        if (err) {
            res.status(500).send('read file1 error');
        }
        fs.readFile('/file2', function (err, data) {
            if (err) {
                res.status(500).send('read file2 error');
            }
            res.type('text/plain');
            res.send(data);
        });
    });
});
```

koa通过generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise。
```js
app.use(async (ctx, next) => {
    await next();
    var data = await doReadFile();
    ctx.response.type = 'text/plain';
    ctx.response.body = data;
});
```

3. express的中间件模型为线型，而koa的中间件模型为U型，也可称为洋葱模型构造中间件
koa2的中间件：
    1、通过async await实现的，中间件执行的顺序是“洋葱圈”模型。
    2、中间件之间通过next函数联系，当一个中间件调用next()后，会将控制权交给下一个中间件，直到下一个中间件不再执行next()后，会沿路返回，将控制权交给前一个中间件。
 Express中间件：
    1、一个接一个顺序执行，response响应写在最后一个中间件中。
    2、特点：
        a.app.use用来注册中间件；
        b.遇到http请求，根据path和method判断触发哪些中间件；
        c.实现next机制，即上一个中间件会通过next触发下一个中间件；

4. 错误处理 - callback  VS  try catch

 Express使用callback捕获异常，深层次的异常捕获不了；
 Koa使用try catch，很好的解决异常捕获；

5. 生命周期

Express的生命周期不确定：express内部执行异步函数，不能确定什么时候执行完； 
Koa确定：koa是基于await/async，在执行下一步操作的时候，必须等待前端await执行完； 

6. 上下文 context
Koa新增了Context对象，用来代替Express的Request和Response，作为请求的上下文对象。 
同时在 koa 框架中, 提供 Node原生的req、res、socket等对象； 

7. 比之 express, koa 社区相对较小.

## 总结

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，主要基于 Connect 中间件，并且自身封装了路由、视图处理等功能, 使用人数众多。

Koa 相对更为年轻， 是 Express 原班人马基于 ES6 新特性重新开发的框架，主要基于 co 中间件，框架自身不包含任何中间件，很多功能需要借助第三方中间件解决，但是由于其基于 ES6 generator 特性的异步流程控制，解决了 "callback hell" 和麻烦的错误处理问题，受开发者欢迎。

总的来说, koa 借助 co 和 generator，很好地解决了异步流程控制和异常捕获问题。其次，Koa 把 Express 中内置的 router、view 等功能都移除了，使得框架本身更轻量。