var express = require('express');
var router = express.Router();

var sql_diagnoseDao = require('../dao/sql_diagnoseDao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sql_diagnose', { title: 'Express' });
});

router.get('/selectByTimeGap', function(req, res, next) {

  sql_diagnoseDao.selectByTimeGap(req, res, next);
});

router.get('/selectTopKByQueryId', function(req, res, next) {
  console.log("enter selectTopKByQueryId");
  sql_diagnoseDao.selectTopKByQueryId(req, res, next);
});

router.get('/selectByQueryId', function(req, res, next) {
  console.log("enter");
  sql_diagnoseDao.selectByQueryId(req, res, next);
});

module.exports = router;
