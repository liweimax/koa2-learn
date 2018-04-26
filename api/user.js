const Router = require('koa-router')
const { asyncQuery } = require('../db/asyncDB')

let userAPIs = new Router()

userAPIs.get('/404', async ( ctx )=>{
        
    ctx.body = ctx.cookies.get("SESSION_ID") || "null";

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

      ctx.session = {
        user_id: Math.random().toString(36).substr(2),
        count: 0
      }

      ctx.body = {status:'successful'};
      return;
    }      
  }
   
  ctx.body = {status:'failed'};
})
.get('/logout', async ( ctx )=>{
 
  ctx.session = {}   
  ctx.body = {status:'successful'};
})

module.exports = { userAPIs }