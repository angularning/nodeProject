const express = require("express");
const router = express.Router();
const request = require('request');
const xlsx = require('node-xlsx');
const fs = require('fs')

router.get("/", function (req, res, next) {
    request.post(`https://api.juejin.cn/content_api/v1/article/detail?aid=2608&uuid=6898508679843644941`,
        {
            json: {"article_id": req.query.url}
        },
        (error, result, body) => {
            if (result.statusCode === 200) {
                // writeFrontedList(body.data)
                res.send(body.data.article_info)
            }
        }
    )
});
function writeFrontedList(data){
    console.log(data)
    let excelArr = []
    excelArr.push(JSON.stringify(data.article_info))
    const excelData = [
        {
            name: 'sheet1',
            data: [
                ['article_id', 'article_info'],
                [data.article_id, ...excelArr]
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
