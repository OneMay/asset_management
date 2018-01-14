var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var favicon = require('serve-favicon')
var cookies = require('cookies');
var admin = require('./routers/admin.js');
var api = require('./routers/api.js');
var app = express();
//var index = require('./routes/index.js');

app.set('views', path.join(path.resolve(__dirname, '..'), 'client'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(path.resolve(__dirname, '..'), 'client')));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//配置用户验证
app.use(session({
    secret: 'fehey',
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    name: 'fehey' // 若不设置 默认为 connect.sid ,name可换成key
}));
//cookie
app.use(function(req, res, next) {
    res.setHeader('cache-control', 'no-cache');
    res.cookies = new cookies(req, res);
    // req.userInfo = {};
    // //解析用户登陆的cookie信息
    // if (req.headers.cookie) {
    //     try {
    //         var reg = /(userInfo=)(.+)/g
    //         var user = reg.exec(req.headers.cookie)[2]
    //         req.userInfo = JSON.parse(user);
    //     } catch (e) {
    //         return next();
    //     }
    // }
    return next();
})
app.get("/", function(req, res) {
    res.render("index");
});
app.use('/api', api);
app.use('/admin', admin);

//路径未匹配
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})
app.use(function(err, req, res, next) {
    res.locals.messgae = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;