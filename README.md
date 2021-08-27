# note-express
express API 总结

首先创建一个 express 应用实例，express() 函数是由 express 模块到处的一个顶级函数。

```js
var express = reqiure('express')
var app = express()
```

## 一、 express 相关 API

1. express.json([options])

expression() 是 express 的内置中间件函数，它使用 body-parser 解析带有 json 负载的传入请求。

也就是说它会解析传入的JSON数据并返回一个对象，且在无效时返回错误。

参数 options

- inflate
- limit - 控制最大请求体大小
- riviver - 直接传递给JSON
- strict - 启用或禁用仅接受数组和对象;禁用时将接受任何JSON,解析接收
- type - 用于确定中间件将解析什么媒体类型
- verify

用一个例子来说明：

```js
var express = require('express'); 
var app = express(); 
var PORT = 3000; 
  
// Without this middleware 
// app.use(express.json()); 
app.post('/', function (req, res) { 
    console.log(req.body.name) 
    res.end(); 
}) 
  
app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
});
```

运行 `node index.js`, 观察使用 express.json() 和不使用 express.json() 场景下控制台的输出，你就会明白 express.json() 的作用了。

2. express.raw([options])

这是Express中内置的中间件功能。基于body-parser将传入的请求有效负载解析为Buffer。

该中间件将所有主体解析为Buffer，并且只查看Content-Type报头与类型选项匹配的请求。该解析器接受主体的任何Unicode编码，并支持gzip和deflate编码的自动膨胀。

在中间件(例如req.body)之后，将在请求对象上填充一个包含解析数据的新的body Buffer，或者如果没有body来解析，Content-Type不匹配，或者发生错误，则填充一个空对象({})。

参数 options

- inflate
- limit - 控制最大请求体大小
- type - 用于确定中间件将解析什么媒体类型
- verify

3. express.Router([options])

创建一个原生 Router 对象。

```js
var router = express.Router([options])
```

参数 options 

- caseSensitive - 大小写敏感，默认false
- mergeParams - 子参数优先，默认false
- strict - 严格模式路由

4. express.static(root, [options])

express 内置中间件，基于 serve-static  服务于静态文件

root参数指定提供静态资源的根目录。该函数通过组合req来确定要服务的文件。带有提供的根目录的Url。当没有找到文件时，它不会发送404响应，而是调用next()转移到下一个中间件，从而允许堆叠和回退。

参数 options

- setHeaders
- etag
- redirect
- lastModified
- maxAge
- immutable
- redirect

5. express.text([options])

express中内置中间件, 基于body-parser将传入的请求有效负载解析为一个字符串。

6. express.urlencoded([options])

express中内置的中间件,基于body-parser使用url编码的有效负载来解析传入的请求。


## 二、application 相关 API

app对象通常表示Express应用程序。通过调用express模块导出的顶级express()函数来创建它:

```js
var express = reqiure('express')
var app = express()

app.get('/', function (req, res) => {
    res.send('hello, Lynne')
})

app.listen(3000)
```

app对象方法:

- 路由HTTP请求;例如，app.method和app.param。
- 配置中间件;看到app.route。
- 渲染HTML视图;看到app.render。
- 注册模板引擎;看到app.engine。
它还具有影响应用程序行为的设置(属性)。

下面是app的属性：
app.local - locals对象的属性是应用程序中的局部变量。

一旦设置，app.locals属性的值将在应用程序的整个生命周期内保持不变，而res.locals属性只在请求的生命周期内有效。
可以访问应用程序中呈现的模板中的局部变量，对于向模板提供辅助函数和应用程序级数据非常有用。在中间件中可以通过req.app.locals获得局部变量。

app.mountpath - 包含一个或多个用于挂载子应用程序的路径模式。重点是模式而不是路径！

```js
var admin = express()

admin.get('/', function (req, res) {
  console.dir(admin.mountpath) // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage')
})

var secret = express()
secret.get('/', function (req, res) {
  console.log(secret.mountpath) // /secr*t
  res.send('Admin Secret')
})

admin.use('/secr*t', secret) // load the 'secret' router on '/secr*t', on the 'admin' sub app
app.use(['/adm*n', '/manager'], admin) // load the 'admin' router on '/adm*n' and '/manager', on the parent app
```

1. app.on('mount', callback(parent)) -  事件，当子应用被挂载到父应用时，会在子应用上触发mount事件。父应用被传递给回调函数。


