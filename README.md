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
- limit
- riviver
- strict
- type
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

