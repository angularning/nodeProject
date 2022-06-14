const detail = async (ctx, next) => {
    const {query: {id}} = ctx;
    const childData = {
        11: {
            id: 11,
            name: '11',
            price: '5.5',
            num: '1',
            img: 'https://img.yzcdn.cn/vant/apple.jpeg',
            childId: 11,
        },
        12: {
            id: 12,
            name: '12',
            price: '3.5',
            num: '1',
            img: 'https://img.yzcdn.cn/vant/banana.jpeg',
            childId: 12,
        },
        13: {
            id: 13,
            name: '13',
            price: '2.5',
            num: '1',
            img: 'https://img.yzcdn.cn/vant/watermelon.jpeg',
            childId: 13,
        },
    }
    const result = childData[id]
    ctx.body = {
        code: 200,
        data: result
    }
}
module.exports = detail
