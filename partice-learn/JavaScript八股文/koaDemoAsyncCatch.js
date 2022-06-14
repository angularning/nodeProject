const koa = require('koa')
const app = new koa()
const getPromise = (el)=> {
    return new Promise(((resolve, reject) => {
        resolve(el)
    }))
}
app.use(async (ctx, next)=> {
    const {key, data} = ctx.query || {}
    if(ctx.url.includes('/getData')){
        await getPromise(ctx)
        ctx.cookies.set('aaaaaaaaaaaaaaaaa', '123456789', [])
        const num = Math.random();
        if(num>0.5){
            ctx.body = num
        } else {
            ctx.body = num
        }
        next()
    }
})
app.listen(3000, '127.0.0.1', ()=> {
    console.log('listening on 3000')
})
