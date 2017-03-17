const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const static = require('koa-static');
const views = require('koa-views');
const jsonp = require('koa-jsonp');

const loggerAsync  = require('./middleware/logger-async');

const home = require('./routes/home');
const page = require('./routes/page');

const app = new Koa();
const router = new Router();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

// 使用ctx.body解析中间件
app.use(bodyParser());

app.use(convert(static(
    path.join( __dirname,  staticPath)
)));

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    map: {html: 'nunjucks'}
}));

app.use(jsonp());

// 自定义中间件 有问题
// app.use(loggerAsync());

// 装载所有子路由
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 所有路由都没有匹配到，则认为404
app.use(async (ctx) => {
    ctx.status = 404
    ctx.body = 'Oh my 404!';
})

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');