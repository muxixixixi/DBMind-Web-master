/**
 * Created by luoyuyu on 2017/12/17.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host :'localhost',
    user :'root',
    database:'dataVisDB',
    password:'',
    dateStrings: 'date',  //避免node-mysql 将mysql的date类型转成js-objects.date();
    port: 3306

});

//pool.connect();
module.exports=pool;
