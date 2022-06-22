
const list = async (ctx, next) => {
    const {query: {plate, search}} = ctx;
    ctx.body = {
        code: 200,
        data: JSON.parse(JSON.stringify({name: 'aaa', age: '18'}))
    }
}
module.exports = list
