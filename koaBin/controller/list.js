const list = async (ctx, next) => {
    const {query: {id, num}} = ctx;
    const data = {
        1: {
            id: 1,
            name: '苹果',
            price: '5.5',
            num: '1',
            img: 'https://img.yzcdn.cn/vant/apple.jpeg',
            childId: 11,
        },
        2: {
            id: 2,
            name: '香蕉',
            price: '3.5',
            num: '1',
            img: 'https://img.yzcdn.cn/vant/banana.jpeg',
            childId: 12,
        },
        3: {
            id: 3,
            name: '西瓜',
            price: '2.5',
            num: '1',
            img: 'https://img.yzcdn.cn/vant/watermelon.jpeg',
            childId: 13,
        },
        }
    ctx.body = {
        code: 200,
        num,
        data: JSON.parse(JSON.stringify(data[id]))
    }
}
module.exports = list
