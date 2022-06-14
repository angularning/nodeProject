const KoaRouter = require('koa-router')
const login = require('../controller/login');
const list = require('../controller/list')
const indexSearch = require('../controller/indexSearch')
const detail = require('../controller/detail')

const jwt = require('jsonwebtoken');
const secret = require('../common/secret')

const router = new KoaRouter()

router.get('/', async (ctx) => {
    ctx.body = '11111'
})
    .post('/login', login)
    .post('/indexSearch', indexSearch)
    .post('/register', async (ctx) => {
        ctx.body = {
            data:{
                code: 0,
                msg: '注册成功'
            }
        }
    })
    .get('/list', list)
    .get('/weibo', async(ctx, next) => {
        // https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3D微博抽奖&page_type=searchall&page=1
    })
    .get('/detail', detail)
    .get('/getToken', async (ctx) => {
        const payload = {name: '1', password: '1'};
        const token = jwt.sign(payload, secret, { expiresIn:  '5s' });
        ctx.body = {
            code: 200,
            token
        }
    })
    .get('/refreshToken', async (ctx) => {
        const payload = {name: '1', password: '1'};
        const token = jwt.sign(payload, secret, { expiresIn:  '5s' });
        ctx.body = {
            code: 200,
            token
        }
    })

module.exports = router
