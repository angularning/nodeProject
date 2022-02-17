const express = require("express");
const router = express.Router();
const request = require('request');
const util = require('util');
const getPromise = util.promisify(request.get);
const cheerio = require("cheerio");

router.get("/", function (req, res, next) {
    getPromise(req.query.url).then((value) => {
        console.log(value.body)
        let $ = cheerio.load(String(value.body));
        let html = $(".article-area").html();
        res.send(value.body)
    }).catch((err) => {
        console.log("err", err);
    });
});

module.exports = router;
