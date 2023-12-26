var express = require('express');
var router = express.Router();

// 메인 페이지
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 사용자가 글을 게시하는 endpoint
router.post('/upload', function(req, res) {
  
});

module.exports = router;
