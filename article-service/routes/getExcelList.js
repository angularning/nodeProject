const express = require("express");
const router = express.Router();
const xlsx = require('node-xlsx');
router.get("/", function (req, res) {
    const sheets = xlsx.parse('/Users/angularning/Desktop/文章数据1.xlsx');
    const data = sheets.map(item=> item);
    res.send({data: data[0]['data']})
});

module.exports = router;
