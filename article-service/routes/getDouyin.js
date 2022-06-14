const express = require("express");
const router = express.Router();
const request = require('request');
const cheerio = require("cheerio");


const headers = {
    "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
}
router.get("/", function (req, res, next) {
    request(`http://www.meijiecao.top/dy/ajax.php?act=dy&url=https://v.douyin.com/8RRUr1s/`, headers, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            // let $ = cheerio.load(String(body));
            // let html = $(".xg-video-container").html();
            // console.log(body);
            res.send(body)
            // console.log(this.href)
            // const url = this.headers.referer
            // const vid = url.split("/?")[0].split("video/")[1]
            // request(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${vid}` ,headers, function (e, res, body1){
            //     const video_url = body1
            //     console.log(video_url)
            // })
        }
    })
})
module.exports = router;
