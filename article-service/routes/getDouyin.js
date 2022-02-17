const request = require('request');
const headers = {
    "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
}
request('https://v.douyin.com/RCxwDgH/', headers, function (err, response, body) {
    if (!err && response.statusCode === 200) {
        // console.log(this.href)
        const url = this.headers.referer
        const vid = url.split("/?")[0].split("video/")[1]
        request(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${vid}` ,headers, function (e, res, body1){
            const video_url = body1
            console.log(video_url)
        })
    }
})
