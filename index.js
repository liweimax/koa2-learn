const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
let home = new Router()

home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

let page = new Router()
page.get('/404', async ( ctx )=>{
    let url = ctx.url
   
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring
    
    ctx.body = {
      url,
      req_query,
      req_querystring,
      ctx_query,
      ctx_querystring
    }
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})


let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

app.use( router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')