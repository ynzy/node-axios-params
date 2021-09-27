const Koa = require('koa');
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const views = require('koa-views')

const index = require('./routes/index')

const app = new Koa();

// error handler
onerror(app)

// global middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
app.use(require('koa-static')(`${__dirname}/public`))
app.use(
    views(`${__dirname}/views`, {
        extension: 'pug',
    })
)

app.use(index.routes(), index.allowedMethods())


const port = 9000  //端口号

app.listen(port, () => {
    console.log('程序启动');
    console.log(`服务端接口，请访问 http://localhost:${port}`);
    console.log(`前端页面，请访问 http://localhost:${port}/html/`);
})

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})