const Router = require('koa-router');
const router = new Router();

router.get('/', async ( ctx ) => {
    let html = `
        <h1>koa2</h1>
        <ul>
          <li><a href="/page/helloworld">helloworld</a></li>
          <li><a href="/page/get_demo?a=1&b=2">get_demo</a></li>
          <li><a href="/page/post_demo">post_demo</a></li>
          <li><a href="/test.html">static</a></li>
          <li><a href="/page/cookie">cookie</a></li>
          <li><a href="/page/template">template</a></li>
          <li><a href="/page/jsonp?callback=cb">jsonp</a></li>
          <li><a href="/page/upload_demo">upload_demo</a></li>
          <li><a href="/page/notfound">404</a></li>
        </ul>
      `;
    ctx.body = html;
});

module.exports = router;