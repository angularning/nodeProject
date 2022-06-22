"use strict";

const koa = require('koa')
const app = new koa();

const errorHandle = require('./middlewear/errHandle')

// 引入路由
const index = require('./routes/index')

const secret = require('./common/secret')

// 解析post参数
const bodyParser = require('koa-bodyparser')

const jwt = require('koa-jwt');

// 使用ctx.body解析中间件
app.use(bodyParser())

// 引入跨域
// const convert = require('koa-convert');
const cors = require('koa-cors');

// 中间件拦截错误
app.use(errorHandle)

// 设置跨域
app.use(cors())

//路由权限控制 除了path里的路径不需要验证token 其他都要
app.use(
    jwt({
        secret
    }).unless({
        path: [/^\/login/, /^\/register/, /^\/refreshToken/, /^\/getToken/]
    })
);

//使用路由
app.use(index.routes());
// 监听端口
app.listen(3001, function(){
    console.log('Server running on http://localhost:3001')
});
