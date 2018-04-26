const Koa = require('koa')
const Router = require('koa-router')

const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const dbConfig = require('./dbConfig')
const { userAPIs } = require('./api/user')

const app = new Koa()

app.use(session({
  key: 'SESSION_ID',
  store: new MysqlSession(dbConfig)
}))


let home = new Router()

home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/user/all">/user/all</a></li>
      <li><a href="/user/404">/user/404</a></li>
      <li><a href="/user/login">/user/login</a></li>     
    </ul>
  `
  ctx.body = html
})


let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/user', userAPIs.routes(), userAPIs.allowedMethods())

app.use( router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('[SERVER] start-quick is starting at port 3000')