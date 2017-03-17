const Router = require('koa-router');
const router = new Router();

router.get('/helloworld', async ( ctx ) => {
    ctx.body = 'helloworld page!';
});

router.get('/get_demo', async ( ctx ) => {
    let url = ctx.url
    // 从上下文的request对象中获取
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    // 从上下文中直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    };
});

router.get('/post_demo', async ( ctx ) => {
    // 当GET请求时候返回表单页面
    let html = `
        <h1>koa2 request post demo</h1>
        <form method="POST" action="/page/post">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>nickName</p>
            <input name="nickName" /><br/>
            <p>email</p>
            <input name="email" /><br/>
            <button type="submit">submit</button>
        </form>
    `;
    ctx.body = html;
});

router.post('/post', async ( ctx ) => {
    let postData = ctx.request.body;
    console.log(postData);
    ctx.body = postData;
});

router.get('/cookie', async ( ctx ) => {
    ctx.cookies.set(
        'cid', // name
        'hello world', // value
        {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/page/cookie', // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date('2020-01-01'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: false  // 是否允许重写
        }
    );
    ctx.body = 'cookie is ok';
});

router.get('/template', async ( ctx ) => {
    // tips: 这里没有await会出现 Not Found
    await ctx.render('user.html', {name: 'animabear'});
});

router.get('/jsonp', async ( ctx ) => {
    let returnData = {
        success: true,
        data: {
            text: 'this is a jsonp api',
            time: new Date().getTime(),
        }
    };

    // 直接输出JSON
    ctx.body = returnData
});

router.get('/upload_demo', async ( ctx ) => {
    // tips: 这里没有await会404
    await ctx.render('upload.html');
});

module.exports = router;