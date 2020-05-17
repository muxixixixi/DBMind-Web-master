var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//申明路由变量
var welcome = require('./routes/welcome');
var users = require('./routes/users');
var dbai = require('./routes/dbai');
var design = require('./routes/design');
var optimization = require('./routes/optimization');
var performance = require('./routes/performance');
var sql_diagnose = require('./routes/sql_diagnose');
var underlying = require('./routes/underlying');
var dashboard = require('./routes/dashboard');
var db_security = require('./routes/db_security');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.engine('html', require('ejs').__express);
// app.set('view engine', 'html');

//这里传入了一个密钥加session id
app.use(cookieParser('Db10204!!'));
//使用靠就这个中间件
app.use(session(
    { secret: 'Db10204!!',
        cookie: {
            maxAge:1000*60*10*10 //100分钟
        },
        proxy: true,
        resave: true,
        saveUninitialized: true
    }
));//maxAge:1000*60*10//过期时间设置(单位毫秒)


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', welcome);
app.use('/users', users);
app.use('/db_security', db_security);
app.use('/dashboard', dashboard);
app.use('/optimization', optimization);
app.use('/performance', performance);
app.use('/sql_diagnose', sql_diagnose);
app.use('/underlying', underlying);
app.use('/dashboard', dashboard);
app.use('/design', design);
app.use('/dbai', dbai);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
