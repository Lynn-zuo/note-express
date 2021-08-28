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

```js
var admin = express()

admin.on('mount', function (parent) {
  console.log('Admin Mounted')
  console.log(parent) // refers to the parent app
})

admin.get('/', function (req, res) {
  res.send('Admin Homepage')
})

app.use('/admin', admin)
```

2. app.all(path, callback [, callback ...]) -  和 app.METHOD() 类似，但它匹配所有请求方法。

path - 路径字符串/路径匹配模式/组合数组
callback - 中间件函数/系列中间件函数/中间件数组/组合

```js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```
app.all()方法对于为特定路径前缀或任意匹配映射“全局”逻辑很有用。例如，如果将以下内容放在所有其他路由定义的顶部，则要求从该点开始的所有路由都需要身份验证，并自动加载用户。请记住，这些回调不必充当端点:loadUser可以执行一个任务，然后调用next()来继续匹配后续路由。

3. app.delete(path, callback [, callback ...]) - 使用指定的回调函数将HTTP DELETE请求路由到指定的路径。
对应HTTP DELETE请求

4. app.get(name) - 返回name应用设置的值，其中name是应用设置表中的字符串之一。

5. app.get(path, callback [, callback ...]) - 使用指定的回调函数将HTTP GET请求路由到指定的路径。
```js
app.get('/', function (req, res) {
  res.send('GET request to homepage')
})
```

5. app.listen(path, [callback]) - 启动UNIX套接字并侦听给定路径上的连接。此方法与Node的http.Server.listen()相同。

```js
var express = require('express')
var app = express()
app.listen('/tmp/sock')
```
6. app.listen([port[, host[, backlog]]][, callback]) - 绑定并监听指定主机和端口上的连接。此方法与Node的http.Server.listen()相同。

如果port被省略或为0，操作系统将分配一个任意未使用的端口，这对于自动化任务(测试等)等情况很有用。

```js
var express = require('express')
var app = express()
app.listen(3000)
```
express()返回的应用程序实际上是一个JavaScript函数，设计成作为回调函数传递给Node的HTTP服务器以处理请求。这使得使用相同的代码库提供应用程序的HTTP和HTTPS版本变得很容易，因为应用程序不继承这些(它只是一个回调):

```js
Var express = require('express')
Var HTTPS = require(' HTTPS ')
Var HTTP = require(' HTTP ')
Var app = express()

http.createServer (app) .listen (80)
https。createServer(选项,程序).listen (443)
```

app.listen()方法返回一个http服务器对象和(对于HTTP)是一个方便的方法如下:

```js
app.listen = function () {
  var server = http.createServer(this)
  return server.listen.apply(server, arguments)
}
```

7. app.METHOD(path, callback [, callback ...]) -路由HTTP请求，其中METHOD是请求的HTTP方法，例如GET、PUT、POST等，以小写表示。因此，实际的方法是app.get()、app.post()、app.put()等等。

API文档中只有针对最流行的HTTP方法app.get()、app.post()、app.put()和app.delete()的显式条目。然而，上面列出的其他方法的工作方式完全相同。

要路由转换为无效JavaScript变量名的方法，请使用括号表示法。例如，app['m-search']('/'，函数....

8. app.param([name], callback)- 在路由参数中添加回调触发器，其中name为参数名称或参数数组，callback为回调函数。
回调函数的参数依次是请求对象、响应对象、下一个中间件、参数的值和参数的名称。

如果name是一个数组，则按声明的顺序为其中声明的每个参数注册回调触发器。此外，除了最后一个参数外，对于每个声明的参数，在回调中调用next将调用下一个声明的参数的回调。对于最后一个参数，对next的调用将调用当前正在处理的路由的下一个中间件，就像name只是一个字符串一样。

9. app.path() - 返回应用程序的规范路径，一个字符串。

```js
var app = express()
var blog = express()
var blogAdmin = express()

app.use('/blog', blog)
blog.use('/admin', blogAdmin)

console.dir(app.path()) // ''
console.dir(blog.path()) // '/blog'
console.dir(blogAdmin.path()) // '/blog/admin'
```

在安装应用程序的复杂情况下，该方法的行为可能会变得非常复杂, 通常使用req.baseUrl更好。以获取应用程序的规范路径。

10. app.post(path, callback [, callback ...]) - 使用指定的回调函数将HTTP POST请求路由到指定的路径。

11. app.render(view, [locals], callback) - 通过回调函数返回视图呈现的HTML。它接受一个可选参数，该参数是一个包含视图局部变量的对象。它类似于res.render()，只不过它不能自己将呈现的视图发送给客户端。

可以将app.render()看作是一个用于生成渲染视图字符串的实用函数。在内部res.render()使用app.render()来渲染视图。

12. app.route(path) - 返回单个路由的实例，然后可以使用该实例. - important!

```js
var app = express()

app.route('/events')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
  })
  .get(function (req, res, next) {
    res.json({})
  })
  .post(function (req, res, next) {
    // maybe add a new event...
  })
```

13. app.set(name, value) - 设置名称赋值。

可以存储任何想要的值，但是某些名称可以用于配置服务器的行为。这些特殊名称在应用程序设置表中列出。

为Boolean属性调用app.set('foo'， true)与调用app.enable('foo')相同。类似地，为一个布尔属性调用app.set('foo'， false)与调用app.disable('foo')相同。

使用app.get()获取设置的值。

14. app.use([path,] callback [, callback...]) - important! 

将指定的中间件功能挂载到指定的路径上:当请求路径的基础与路径匹配时，中间件功能将被执行。

Error-handling middleware

错误处理中间件总是有四个参数。必须提供四个参数来将其标识为一个错误处理中间件函数。即使您不需要使用下一个对象，也必须指定它来维护签名。否则，下一个对象将被解释为常规中间件，并将无法处理错误。

以与其他中间件函数相同的方式定义错误处理中间件函数，除了使用四个参数而不是三个参数，特别是使用签名(err, req, res, next):

```js
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```


## 三、Request 相关 API

req对象表示HTTP请求，并具有请求查询字符串、参数、主体、HTTP头等属性。在本文档中，按照约定，对象总是被称为req (HTTP响应是res)，但它的实际名称是由您正在使用的回调函数的参数决定的。

request 对象的属性及API较多，也都比较好理解，选择几个比较重要的记录。

1. req.app - 此属性保存对正在使用中间件的Express应用程序实例的引用。

如果遵循这样的模式，即创建一个模块，只导出一个中间件函数并在主文件中require()它，那么中间件可以通过req.app访问Express实例

2. req.body - 包含在请求主体中提交的键值对数据。

默认情况下，它是未定义的，并在使用body解析中间件(如express.json()或express.urlencoded())时填充。

3. req.cookies - 当使用cookie-parser中间件时，此属性是一个包含请求发送的cookie的对象。如果请求不包含cookie，它默认为{}。

4. req.method
5. req.originalUrl
6. req.query
此属性是一个对象，包含路由中每个查询字符串参数的属性。当查询解析器设置为disabled时，它是一个空对象{}，否则它是配置的查询解析器的结果。

7. req.route - 包含当前匹配的路由，字符串。

8. req.get(field) - 返回指定的HTTP请求报头字段(不区分大小写)。Referrer和Referer字段是可以互换的。

## 四、Response 相关API

res对象表示Express应用程序在收到HTTP请求时发送的HTTP响应。

1. res.append(field [, value]) - 将指定的值附加到HTTP响应报头字段。

如果头还没有设置，它将使用指定的值创建头。value参数可以是字符串或数组。

注意:在res.append()之后调用res.set()将重置之前设置的头文件值。

2. res.cookie(name, value [, options]) - 设置cookie名称为value。value参数可以是转换为JSON的字符串或对象。

options参数是一个对象，可以具有以下属性:

domian - 
expires - 
path - 
httpOnly - 

3. res.end([data] [, encoding]) - 结束响应过程。

这个方法实际上来自Node核心，特别是http.ServerResponse的response.end()方法。

用于在没有任何数据的情况下快速结束响应。如果需要用数据响应，请使用res.send()和res.json()等方法。

4. res.get(filed) - 返回由字段指定的HTTP响应头。匹配不区分大小写。

5. res.json([body]) - 发送一个JSON响应。

此方法发送一个响应(具有正确的内容类型)，该响应是使用JSON.stringify()转换为JSON字符串的参数。

该参数可以是任何JSON类型，包括对象、数组、字符串、布尔值、数字或null，您还可以使用它将其他值转换为JSON。

6. res.render(view [, locals] [, callback]) - 呈现视图并将呈现的HTML字符串发送给客户端。
可选参数:

局部变量对象，其属性为视图定义局部变量。
Callback，一个回调函数。如果提供该方法，则返回可能的错误和呈现的字符串，但不执行自动响应。当错误发生时，该方法在内部调用next(err)。
view参数是一个字符串，它是要呈现的视图文件的文件路径。这可以是绝对路径，也可以是相对于视图设置的路径。如果路径不包含文件扩展名，则视图引擎设置将确定文件扩展名。如果路径确实包含文件扩展名，那么Express将为指定的模板引擎加载模块(通过require())，并使用加载模块的__express函数渲染它。

7. res.redirect([status,] path) - 重定向到具有指定状态的从指定路径派生的URL，该状态是一个对应于HTTP状态代码的正整数。如果没有指定，status默认为" 302 " Found。

8. res.send([body]) - 发送HTTP响应。

body参数可以是Buffer对象、String对象、对象、布尔值或数组。

## 五、Router 相关 API

1. router.all(path, [callback, ...] callback) - 匹配所有HTTP方法,类似app.all

这个方法与router.METHOD()方法类似，只是它匹配所有HTTP方法(动词)。

这个方法对于映射特定路径前缀或任意匹配的“全局”逻辑非常有用。例如，如果您将下列路由放在所有其他路由定义的顶部，它将要求从该点开始的所有路由都需要身份验证，并自动加载一个用户。请记住，这些回调函数不必充当端点;loadUser可以执行一个任务，然后调用next()来继续匹配后续路由。

2. router.route(path) - 返回单个路由的实例，然后可以使用该实例处理带有可选中间件的HTTP方法。

使用router.route()来避免重复路由命名，从而避免输入错误。

基于上面的router.param()示例，下面的代码展示了如何使用router.route()来指定各种HTTP方法处理程序。

```js
var router = express.Router()

router.param('user_id', function (req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  }
  next()
})

router.route('/users/:user_id')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next()
  })
  .get(function (req, res, next) {
    res.json(req.user)
  })
  .put(function (req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name
    // save user ... etc
    res.json(req.user)
  })
  .post(function (req, res, next) {
    next(new Error('not implemented'))
  })
  .delete(function (req, res, next) {
    next(new Error('not implemented'))
  })
```

3. router.use([path], [function, ...] function) - 使用指定的中间件函数，带有可选的挂载路径路径，默认为" / "。

这个方法类似于app.use().

中间件就像一个管道:请求从定义的第一个中间件函数开始，然后“向下”处理它们匹配的每个路径的中间件堆栈。

```js
var express = require('express')
var app = express()
var router = express.Router()

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path)
  next()
})

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function (req, res, next) {
  // ... maybe some additional /bar logging ...
  next()
})

// always invoked
router.use(function (req, res, next) {
  res.send('Hello World')
})

app.use('/foo', router)

app.listen(3000)
```

mount路径被剥离，并且对中间件功能不可见。这个特性的主要影响是，不管“前缀”路径名如何，挂载的中间件函数都可以在不更改代码的情况下运行。

使用router.use()定义中间件的顺序非常重要。它们是顺序调用的，因此顺序定义了中间件优先级。例如，记录器通常是您将使用的第一个中间件，因此每个请求都会被记录。