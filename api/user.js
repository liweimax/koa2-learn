const Router = require('koa-router')
const { asyncQuery } = require('../db/asyncDB')

let userAPIs = new Router()

userAPIs.get('/404', async ( ctx )=>{
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
}).get('/all', async ( ctx )=>{
 
  let dataList = await asyncQuery( 'SELECT * FROM user' )
  ctx.body =  dataList;

})
.get('/login', async ( ctx )=>{
 
  let name = ctx.request.query.name;
  let password = ctx.request.query.password;

  let dataList = await asyncQuery( `SELECT * FROM user where name="${name}"`)
  for(var ii=0; ii<dataList.length; ++ii){
    let info = dataList[ii];
    if(info.password == password){
      ctx.body = {status:'successful'};
      return;
    }      
  }
   
  ctx.body = {status:'failed'};
})


module.exports = { userAPIs }