const express = require("express");
const router = express.Router();
const xlsx = require('node-xlsx');
const request = require('request');
const util = require('util');
const getPromise = util.promisify(request.get);
const cheerio = require("cheerio");
const fs = require('fs')

const that = this
router.get("/", function (req, res, next) {
    request.post('https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed',
        {
            json: {"id_type": 2, "sort_type": 200, "cate_id": "6809637767543259144", "cursor": "0", "limit": 20}
        },
        (error, result, body) => {
            if (result.statusCode === 200) {
                console.log(body)
                writeFrontedList(body.data)
                res.send(body)
            }
        }
    )
    // getPromise(req.query.url).then((value) => {
    //     console.log(value.body)
    //     res.send(value.body)
    //     // let $ = cheerio.load(String(value.body));
    //     // let html = $(".article-area").html();
    //     // res.send(html)
    // }).catch((err) => {
    //     console.log("err", err);
    // });
});
function writeFrontedList(data){
    let excelArr = []
    data.map(item=> {
        const temp = Object.values(item);
        const result = temp.map(res=> JSON.stringify(res))
        excelArr.push(result)
    })
    const excelData = [
        {
            name: 'sheet1',
            data: [
                Object.keys(data[0]),
                ...excelArr
            ]
        }
    ]
    const buffer = xlsx.build(excelData);
    fs.writeFile('/Users/angularning/Desktop/文章数据1.xlsx', buffer, function(err) {
        if (err) {
            console.log("Write failed: " + err);
            return;
        }
        console.log("写入成功");
    });
}

module.exports = router;
