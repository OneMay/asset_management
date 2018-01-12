var express = require('express');
var router = express.Router();
var cookies = require('cookies');
var moment = require('moment');
var db = require('../mysql/connect');
//统一返回格式
var responseData;
router.use(function(req, res, next) {
    // res.cookies = new cookies(req, res);
    responseData = {
        code: 200,
        message: ''
    }
    next();
})
Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份         
            "d+": this.getDate(), //日         
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
            "H+": this.getHours(), //小时         
            "m+": this.getMinutes(), //分         
            "s+": this.getSeconds(), //秒         
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
            "S": this.getMilliseconds() //毫秒         
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    // router.use(function(req, res, next) {
    //     var originalUrl = ['/set/shoppingCart', '/get/orderList']
    //     if (originalUrl.indexOf(req._parsedUrl.pathname) >= 0) {
    //         if (req.session.user_id) {
    //             User.findOne({
    //                 _id: req.session.user_id
    //             }).then(function(result[0]) {
    //                 if (result[0]) {
    //                     console.log(result[0])

//                     res.cookies.set('result[0]', JSON.stringify({
//                         _id: result[0]._id,
//                         username: encodeURI(result[0].username),
//                         phoneNumber: result[0].phoneNumber,
//                         invitation_code: result[0].invitation_code,
//                         member_mark: result[0].member_mark
//                     }), {
//                         'httpOnly': false,
//                         'path': '/'
//                     });
//                     next()
//                 } else {
//                     res.cookies.set('result[0]', null, {
//                         'httpOnly': false,
//                         'path': '/'
//                     });
//                     res.redirect(301, '/login.html');
//                     return;
//                 }
//             })
//         } else {
//             res.cookies.set('result[0]', null, {
//                 'httpOnly': false,
//                 'path': '/'
//             });
//             res.redirect(301, '/login.html');
//             return;
//         }
//     } else {
//         next();
//     }
// })
//登陆
router.post('/user/login', function(req, res, next) {
    var employeeNo = req.body.employeeNo;
    var password = req.body.employeeNo;
    if (employeeNo && password) {
        var client = db.connectServer();
        var data = {
            employeeNo: employeeNo,
            password: password
        }
        db.login(client, data, function(result) {
            if (result[0]) {
                req.session.user_id = result[0].employeeNo;
                responseData.code = 200;
                responseData.message = '登陆成功';
                var userInfoL = {
                    userInfo: {
                        _id: result[0].employeeNo,
                        name: result[0].name,
                        code: result[0].code
                    }
                }
                Object.assign(responseData, userInfoL);

                res.cookies.set('userInfo', JSON.stringify({
                    employeeNo: result[0].employeeNo,
                    name: encodeURI(result[0].name),
                    code: result[0].code,
                }), {
                    'httpOnly': false,
                    'path': '/'
                });
                res.json(responseData);
                return;
            } else {
                responseData.code = 404;
                responseData.message = '员工编号或密码错误';
                return res.json(responseData);
            }
        })
    }
})
module.exports = router;