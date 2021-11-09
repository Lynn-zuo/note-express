const Koa = require('./src/application.js');
const app = new Koa();

app.use((ctx, next) => {
  ctx.status = 200;
  ctx.message = 'ok';
  console.log(1);
  next();
  console.log(2);
});

app.use((ctx, next) => {
  console.log(3);
  next();
  console.log(4);
});

app.use((ctx, next) => {
  console.log(5);
  next();
  console.log(6);
  ctx.status = 201;
});

app.use((ctx, next) => {
  console.log(ctx.header);
  console.log(ctx.method);
  console.log(ctx.url);
  console.log(ctx.query);
  console.log(ctx.status);
  console.log(ctx.message);
  ctx.body = 'hello, my-koa-demo';
});

app.listen(3000, () => {
  console.log('server is running on 3000...');
});
