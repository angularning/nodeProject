var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/index", function (req, res, next) {
  res.send({result: "0", data: [{name: 1},{name: 2}]});
});

module.exports = router;
