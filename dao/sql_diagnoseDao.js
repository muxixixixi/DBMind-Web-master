var pool = require('../mysql/dbConfig');

var $sql = require('./sql_diagnoseMapping');


var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};


module.exports = {
    selectByTimeGap: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = req.query || req.params;
            connection.query($sql.selectByTimeGap, [param.start_time, param.end_time], function (err, result) {
                jsonWrite(res, result);
                console.log(err);
                connection.release();
            });
        });
    },

    selectByQueryId: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = req.query || req.params;
            connection.query($sql.selectByQueryId, param.query_id, function (err, result) {
                jsonWrite(res, result);
                console.log(err);
                connection.release();
            });
        });
    },

    selectTopKByQueryId: function (req, res, next) {
        var queries = [];
        pool.getConnection(function (err, connection) {
            var param = req.query || req.params;
            connection.query($sql.selectByQueryId, param.query_id, function (err, result) {
                if(result[0].query_id_impact_1 != null){
                    connection.query($sql.selectByQueryId, result[0].query_id_impact_1, function (err, result) {
                    if (result.length !== 0)
                        queries.push(JSON.parse(JSON.stringify(result[0])));
                    });
                }

                if(result[0].query_id_impact_2 != null) {
                    connection.query($sql.selectByQueryId, result[0].query_id_impact_2, function (err, result) {
                        if (result.length !== 0)
                            queries.push(JSON.parse(JSON.stringify(result[0])));
                    });
                }

                if(result[0].query_id_impact_3 != null) {
                    connection.query($sql.selectByQueryId, result[0].query_id_impact_3, function (err, result) {
                        if (result.length !== 0)
                            queries.push(JSON.parse(JSON.stringify(result[0])));
                    });
                }

                if(result[0].query_id_impact_4 != null) {
                    connection.query($sql.selectByQueryId, result[0].query_id_impact_4, function (err, result) {
                        if (result.length !== 0)
                            queries.push(JSON.parse(JSON.stringify(result[0])));
                    });
                }

                if(result[0].query_id_impact_5 != null) {
                    connection.query($sql.selectByQueryId, result[0].query_id_impact_5, function (err, result) {
                        if (result.length !== 0)
                            queries.push(JSON.parse(JSON.stringify(result[0])));
                        jsonWrite(res, queries);
                    });
                } else {
                    jsonWrite(res, queries);
                }
            });
            connection.release();
        });
    }
};