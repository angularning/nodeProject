const jwt = require('jsonwebtoken');
const checkUser = (n, p) => {
    return n === '1' && p === '1' || n === 'admin' && p === 'admin'
}
const secret = require('../common/secret')
async function delayer(time = 2000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
const login = async(ctx, next) => {
    const {name, password} = ctx.request.body
    if(checkUser(name, password)){
        await delayer();
        await next();
        const payload = {name, password};
        const token = jwt.sign(payload, secret, { expiresIn:  '20s' });
        ctx.body = {
            code: 200,
            message: '登录成功',
            token,
            data: {
                token,
                userInfo: {
                    name,
                    password,
                    img: 'https://img2.baidu.com/it/u=976187030,237040006&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                    headerImg: 'https://img1.baidu.com/it/u=3845453165,2680391542&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500'
            }
            }
        }
    }else{
        ctx.body = {
            code: -1,
            message: '登录失败'
        }
    }
};
module.exports = login
