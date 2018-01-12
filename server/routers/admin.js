var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var moment = require('moment');
var db = require('../mysql/connect');
//统一返回格式
var responseData;
var num = 0;
router.use(function(req, res, next) {
        responseData = {
            code: 200,
            message: ''
        }
        next();
    })
    //时间格式化
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
    //     var originalUrl = ['/user/login', 'user/logout']
    //     if (originalUrl.indexOf(req._parsedUrl.pathname) < 0) {
    //         if (req.session.adminuser_id) {
    //             adminUser.findOne({
    //                 _id: req.session.adminuser_id
    //             }).then(function(userInfo) {
    //                 if (userInfo) {
    //                     res.cookies.set('adminuserInfo', JSON.stringify({
    //                         _id: userInfo._id,
    //                         username: userInfo.username
    //                     }), {
    //                         'httpOnly': false,
    //                         'path': '/admin'
    //                     });
    //                     next()
    //                 }
    //             })
    //         } else {
    //             res.cookies.set('adminuserInfo', null, {
    //                 'httpOnly': false,
    //                 'path': '/admin'
    //             });
    //             res.redirect(301, '/admin/login.html');
    //             return;
    //         }
    //     } else {
    //         next();
    //     }
    // })
    //员工添加
router.post('/employee/add', function(req, res, next) {
        var name = req.body.name;
        var sex = req.body.sex;
        var address = req.body.address;
        var workTelExt = req.body.workTelExt;
        var homeTelNo = req.body.homeTelNo;
        var emplEmailAddress = req.body.emplEmailAddress;
        var sociaSecurityNumber = req.body.sociaSecurityNumber;
        var DOB = req.body.DOB;
        var position = req.body.position;
        var salary = req.body.salary;
        var dateStarted = req.body.dateStarted;
        var count;
        if (name && sex && address && workTelExt && homeTelNo && emplEmailAddress && sociaSecurityNumber && DOB && position && salary && dateStarted) {
            var client = db.connectServer();
            db.employeeNo_search(client, function(result) {
                count = result.length;
                var data = {
                    name: name,
                    sex: sex,
                    address: address,
                    workTelExt: workTelExt,
                    homeTelNo: homeTelNo,
                    emplEmailAddress: emplEmailAddress,
                    sociaSecurityNumber: sociaSecurityNumber,
                    DOB: DOB,
                    position: position,
                    salary: salary,
                    dateStarted: dateStarted,
                    employeeNo: '2018' + (count + 1)
                }
                db.employee_add(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '添加成功';
                    return res.json(responseData);
                })
            })
        } else {
            responseData.code = 404;
            responseData.message = '信息不完整';
            return res.json(responseData);
        }

    })
    //按员工编号查询
router.post('/employee/employeeNo_search', function(req, res, next) {
        var employeeNo = req.body.employeeNo;
        if (employeeNo) {
            var client = db.connectServer();
            db.employee_search(client, employeeNo, function(result) {
                if (result[0]) {
                    responseData.userInfo = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.userInfo = {};
                    responseData.code = 404;
                    responseData.message = '无此员工信息记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入员工编号';
            return res.json(responseData);
        }
    })
    //按员工姓名模糊查询
router.post('/employee/name_search', function(req, res, next) {
        var name = req.body.name;
        if (name) {
            var client = db.connectServer();
            db.employeeName_search(client, name, function(result) {
                if (result.length > 0) {
                    responseData.userInfo = result;
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.userInfo = [];
                    responseData.code = 404;
                    responseData.message = '无此员工信息记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入员工姓名';
            return res.json(responseData);
        }
    })
    //所有员工编号查询
router.post('/employee/search', function(req, res, next) {
        var client = db.connectServer();
        db.employeeNo_search(client, function(result) {
            var employeeNo = [];
            for (var i = 0; i < result.length; i++) {
                employeeNo.push(result[i].employeeNo);
            }
            responseData.userInfo = result;
            responseData.employeeNo = employeeNo;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //员工信息修改
router.post('/employee/update', function(req, res, next) {
        var name = req.body.name;
        var sex = req.body.sex;
        var address = req.body.address;
        var workTelExt = req.body.workTelExt;
        var homeTelNo = req.body.homeTelNo;
        var emplEmailAddress = req.body.emplEmailAddress;
        var sociaSecurityNumber = req.body.sociaSecurityNumber;
        var DOB = req.body.DOB;
        var position = req.body.position;
        var salary = req.body.salary;
        var dateStarted = req.body.dateStarted;
        var employeeNo = req.body.employeeNo;
        if (name && sex && address && workTelExt && homeTelNo && emplEmailAddress && sociaSecurityNumber && DOB && position && salary && dateStarted && employeeNo) {
            var client = db.connectServer();
            var data = {
                name: name,
                sex: sex,
                address: address,
                workTelExt: workTelExt,
                homeTelNo: homeTelNo,
                emplEmailAddress: emplEmailAddress,
                sociaSecurityNumber: sociaSecurityNumber,
                DOB: DOB,
                position: position,
                salary: salary,
                dateStarted: dateStarted,
                employeeNo: employeeNo
            }

            db.employee_uptate(client, data, function(result) {
                responseData.code = 200;
                responseData.message = '修改成功';
                return res.json(responseData);
            })
        } else {
            responseData.code = 404;
            responseData.message = '信息不完整';
            return res.json(responseData);
        }
    })
    //按员工编号删除
router.delete('/employee/delete', function(req, res, next) {
    var employeeNo = req.query.employeeNo;
    if (employeeNo) {
        var client = db.connectServer();
        db.employee_search(client, employeeNo, function(result) {
            if (result[0]) {
                db.employeeNo_delete(client, employeeNo, function() {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此员工信息记录';
                return res.json(responseData);
            }
        })

    } else {
        responseData.code = 404;
        responseData.message = '请输入员工编号';
        return res.json(responseData);
    }
})

//资产类别添加
router.post('/assetCategory/add', function(req, res, next) {
        var count;
        var assetCategoryDescription = req.body.assetCategoryDescription;
        if (assetCategoryDescription) {
            var client = db.connectServer();
            db.assetCategory_search_all(client, function(result) {
                count = result.length;
                var data = {
                    assetCategoryNo: '66802' + (count + 1),
                    assetCategoryDescription: assetCategoryDescription
                }
                db.assetCategory_add(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '添加成功';
                    return res.json(responseData);
                })
            })
        } else {
            responseData.code = 404;
            responseData.message = '信息输入不完整';
            return res.json(responseData);
        }
    })
    //按资产类别编号查询
router.post('/assetCategory/search', function(req, res, next) {
        var assetCategoryNo = req.body.assetCategoryNo;
        if (assetCategoryNo) {
            var client = db.connectServer();
            db.assetCategory_search(client, assetCategoryNo, function(result) {
                if (result[0]) {
                    responseData.assetCategory = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.assetCategory = {};
                    responseData.code = 404;
                    responseData.message = '无此资产类别记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入资产类别编号';
            return res.json(responseData);
        }
    })
    //查询所有资产类别编号
router.post('/assetCategory/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.assetCategory_search_all(client, function(result) {
            var assetCategoryNo = [];
            for (var i = 0; i < result.length; i++) {
                assetCategoryNo.push(result[i].assetCategoryNo);
            }
            responseData.assetCategory = result;
            responseData.assetCategoryNo = assetCategoryNo;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //按资产类别编号删除
router.delete('/assetCategory/delete', function(req, res, next) {
        var assetCategoryNo = req.query.assetCategoryNo;
        if (assetCategoryNo) {
            var client = db.connectServer();
            db.assetCategory_search(client, assetCategoryNo, function(result) {
                if (result[0]) {
                    db.assetCategory_delete(client, assetCategoryNo, function(result) {
                        responseData.code = 200;
                        responseData.message = '删除成功';
                        return res.json(responseData);
                    })
                } else {
                    responseData.code = 404;
                    responseData.message = '无此资产类别记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入资产类别编号';
            return res.json(responseData);
        }
    })
    //资产状况添加
router.post('/status/add', function(req, res, next) {
        var count;
        var statusDescription = req.body.statusDescription;
        if (statusDescription) {
            var client = db.connectServer();
            db.status_search_all(client, function(result) {
                count = result.length;
                var data = {
                    statuNo: 'statusNo' + (count + 1),
                    statusDescription: statusDescription
                };
                db.status_add(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '添加成功';
                    return res.json(responseData);
                })
            })
        } else {
            responseData.code = 404;
            responseData.message = '信息输入不完整';
            return res.json(responseData);
        }
    })
    //按资产状况编号查询
router.post('/status/search', function(req, res, next) {
        var statuNo = req.body.statuNo;
        if (statuNo) {
            var client = db.connectServer();
            db.status_search(client, statuNo, function(result) {
                if (result[0]) {
                    responseData.status = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.status = {};
                    responseData.code = 404;
                    responseData.message = '无此资产状况记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入资产状况编号';
            return res.json(responseData);
        }
    })
    //查询所有资产状况编号
router.post('/status/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.status_search_all(client, function(result) {
            var statuNo = [];
            for (var i = 0; i < result.length; i++) {
                statuNo.push(result[i].statuNo);
            }
            responseData.status = result;
            responseData.statuNo = statuNo;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //按资产状况编号删除
router.delete('/status/delete', function(req, res, next) {
    var statuNo = req.query.statuNo;
    if (statuNo) {
        var client = db.connectServer();
        db.status_search(client, statuNo, function(result) {
            if (result[0]) {
                db.status_delete(client, statuNo, function(result) {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此资产状况记录';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '请输入资产状况编号';
        return res.json(responseData);
    }
})

//资产添加
router.post('/asset/add', function(req, res, next) {
        var assetDescription = req.body.assetDescription;
        var serialNo = req.body.serialNo;
        var dateAcquired = req.body.dateAcquired;
        var purchasePrice = req.body.purchasePrice;
        var currentValue = req.body.currentValue;
        var dateSold = req.body.dateSold;
        var nextMaintenanceDate = req.body.nextMaintenanceDate;
        var employeeNo = req.body.employeeNo;
        var assetCategoryNo = req.body.assetCategoryNo;
        var statuNo = req.body.statuNo;
        var count;
        if (assetDescription && serialNo && dateAcquired && purchasePrice && currentValue && dateSold && nextMaintenanceDate && employeeNo && assetCategoryNo && statuNo) {
            var client = db.connectServer();
            db.asset_search_all(client, function(result) {
                count = result.length;
                var data = {
                    assetDescription: assetDescription,
                    serialNo: serialNo,
                    dateAcquired: dateAcquired,
                    purchasePrice: purchasePrice,
                    currentValue: currentValue,
                    dateSold: dateSold,
                    nextMaintenanceDate: nextMaintenanceDate,
                    employeeNo: employeeNo,
                    assetCategoryNo: assetCategoryNo,
                    statuNo: statuNo,
                    assetNo: 'new18' + (count + 1)
                }
                db.asset_add(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '添加成功';
                    return res.json(responseData);
                })
            });

        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按资产编号查询
router.post('/asset/assetNo_search', function(req, res, next) {
        var assetNo = req.body.assetNo;
        if (assetNo) {
            var client = db.connectServer();
            db.assetNo_search(client, assetNo, function(result) {
                if (result[0]) {
                    responseData.asset = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.asset = {};
                    responseData.code = 404;
                    responseData.message = '无此资产信息';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入资产编号';
            return res.json(responseData);
        }
    })
    //按资产描述查询
router.post('/asset/assetDescription_search', function(req, res, next) {
        var assetDescription = req.body.assetDescription;
        if (assetDescription) {
            var client = db.connectServer();
            db.assetDescription_search(client, assetDescription, function(result) {
                if (result.length > 0) {
                    responseData.asset = result;
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.asset = [];
                    responseData.code = 404;
                    responseData.message = '无此资产信息';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入资产描述';
            return res.json(responseData);
        }
    })
    //查询所有资产
router.post('/asset/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.asset_search_all(client, function(result) {
            var assetNo = [];
            for (var i = 0; i < result.length; i++) {
                assetNo.push(result[i].assetNo);
            }
            responseData.asset = result;
            responseData.assetNo = assetNo;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //资产信息更新
router.post('/asset/update', function(req, res, next) {
        var assetDescription = req.body.assetDescription;
        var serialNo = req.body.serialNo;
        var dateAcquired = req.body.dateAcquired;
        var purchasePrice = req.body.purchasePrice;
        var currentValue = req.body.currentValue;
        var dateSold = req.body.dateSold;
        var nextMaintenanceDate = req.body.nextMaintenanceDate;
        var employeeNo = req.body.employeeNo;
        var assetCategoryNo = req.body.assetCategoryNo;
        var statuNo = req.body.statuNo;
        var assetNo = req.body.assetNo;
        if (assetDescription && serialNo && dateAcquired && purchasePrice && currentValue && dateSold && nextMaintenanceDate && employeeNo && assetCategoryNo && statuNo && assetNo) {
            var client = db.connectServer();
            var data = {
                assetDescription: assetDescription,
                serialNo: serialNo,
                dateAcquired: dateAcquired,
                purchasePrice: purchasePrice,
                currentValue: currentValue,
                dateSold: dateSold,
                nextMaintenanceDate: nextMaintenanceDate,
                employeeNo: employeeNo,
                assetCategoryNo: assetCategoryNo,
                statuNo: statuNo,
                assetNo: assetNo
            }
            db.asset_update(client, data, function(result) {
                responseData.code = 200;
                responseData.message = '更新成功';
                return res.json(responseData);
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按资产编号删除
router.delete('/asset/dalete', function(req, res, next) {
        var assetNo = req.query.assetNo;
        if (assetNo) {
            var client = db.connectServer();
            db.assetNo_search(client, assetNo, function(result) {
                if (result[0]) {
                    db.asset_delete(client, assetNo, function(result) {
                        responseData.code = 200;
                        responseData.message = '删除成功';
                        return res.json(responseData);
                    })
                } else {
                    responseData.code = 404;
                    responseData.message = '无此资产信息';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入资产编号';
            return res.json(responseData);
        }
    })
    //资产管理业务代理添加
router.post('/agent/add', function(req, res, next) {
        var agentName = req.body.agentName;
        var agentStreet = req.body.agentStreet;
        var agentCity = req.body.agentCity;
        var agentState = req.body.agentState;
        var agentZipCode = req.body.agentZipCode;
        var agentTelNo = req.body.agentTelNo;
        var agentFaxNo = req.body.agentFaxNo;
        var agentEmailAddress = req.body.agentEmailAddress;
        var agentWebAdderss = req.body.agentWebAdderss;
        var contactName = req.body.contactName;
        var contactTelNo = req.body.contactTelNo;
        var contactFaxNo = req.body.contactFaxNo;
        var contactEmailAddress = req.body.contactEmailAddress;
        var count;
        if (agentName && agentStreet && agentCity && agentState && agentZipCode && agentTelNo && agentFaxNo && agentEmailAddress && agentWebAdderss && contactName && contactTelNo && contactFaxNo && contactEmailAddress) {
            var client = db.connectServer();
            db.agent_search_all(client, function(result) {
                count = result.length;
                var data = {
                    agentName: agentName,
                    agentStreet: agentStreet,
                    agentCity: agentCity,
                    agentState: agentState,
                    agentZipCode: agentZipCode,
                    agentTelNo: agentTelNo,
                    agentFaxNo: agentFaxNo,
                    agentEmailAddress: agentEmailAddress,
                    agentWebAdderss: agentWebAdderss,
                    contactName: contactName,
                    contactTelNo: contactTelNo,
                    contactFaxNo: contactFaxNo,
                    contactEmailAddress: contactEmailAddress,
                    agentNo: 'agent8' + (count + 1)
                };
                db.agent_add(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '添加成功';
                    return res.json(responseData);
                })
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按资产管理业务代理编号查询
router.post('/agent/agentNo_search', function(req, res, next) {
        var agentNo = req.body.agentNo;
        if (agentNo) {
            var client = db.connectServer();
            db.agent_search(client, agentNo, function(result) {
                if (result[0]) {
                    responseData.agent = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.agent = {};
                    responseData.code = 404;
                    responseData.message = '无此资产管理业务代理信息';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入资产管理业务代理编号';
            return res.json(responseData);
        }
    })
    //查询所有资产管理业务代理
router.post('/agent/searchAll', function(req, res, next) {
        var client = db.connectServer();
        db.agent_search_all(client, function(result) {
            var agentNo = [];
            for (var i = 0; i < result.length; i++) {
                agentNo.push(result[i].agentNo);
            }
            responseData.agent = result;
            responseData.agentNo = agentNo;
            responseData.code = 200;
            responseData.message = 'success';
            return res.json(responseData);
        })
    })
    //资产管理业务代理更新
router.post('/agent/update', function(req, res, next) {
        var agentName = req.body.agentName;
        var agentStreet = req.body.agentStreet;
        var agentCity = req.body.agentCity;
        var agentState = req.body.agentState;
        var agentZipCode = req.body.agentZipCode;
        var agentTelNo = req.body.agentTelNo;
        var agentFaxNo = req.body.agentFaxNo;
        var agentEmailAddress = req.body.agentEmailAddress;
        var agentWebAdderss = req.body.agentWebAdderss;
        var contactName = req.body.contactName;
        var contactTelNo = req.body.contactTelNo;
        var contactFaxNo = req.body.contactFaxNo;
        var contactEmailAddress = req.body.contactEmailAddress;
        var agentNo = req.body.agentNo;
        if (agentName && agentStreet && agentCity && agentState && agentZipCode && agentTelNo && agentFaxNo && agentEmailAddress && agentWebAdderss && contactName && contactTelNo && contactFaxNo && contactEmailAddress && agentNo) {
            var client = db.connectServer();
            var data = {
                agentName: agentName,
                agentStreet: agentStreet,
                agentCity: agentCity,
                agentState: agentState,
                agentZipCode: agentZipCode,
                agentTelNo: agentTelNo,
                agentFaxNo: agentFaxNo,
                agentEmailAddress: agentEmailAddress,
                agentWebAdderss: agentWebAdderss,
                contactName: contactName,
                contactTelNo: contactTelNo,
                contactFaxNo: contactFaxNo,
                contactEmailAddress: contactEmailAddress,
                agentNo: agentNo
            };
            db.agent_update(client, data, function(result) {
                responseData.code = 200;
                responseData.message = '更新成功';
                return res.json(responseData);
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //资产管理业务代理删除
router.delete('/agent/delete', function(req, res, next) {
    var agentNo = req.query.agentNo;
    if (agentNo) {
        var client = db.connectServer();
        db.agent_search(client, agentNo, function(result) {
            if (result[0]) {
                db.agent_delete(client, agentNo, function(result) {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此资产管理业务代理信息';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '请输入资产管理业务代理编号';
        return res.json(responseData);
    }
})

//资产维护添加
router.post('/maintenance/add', function(req, res, next) {
        var maintenanceDate = req.body.maintenanceDate;
        var maintenanceDescription = req.body.maintenanceDescription;
        var maintenanceCost = req.body.maintenanceCost;
        var assetNo = req.body.assetNo;
        var employeeNo = req.body.employeeNo;
        var agentNo = req.body.agentNo;
        var count;
        if (maintenanceDate && maintenanceDescription && maintenanceCost && assetNo && employeeNo && agentNo) {
            var client = db.connectServer();
            db.maintenance_search_all(client, function(result) {
                count = result.length;
                var data = {
                    maintenanceDate: maintenanceDate,
                    maintenanceDescription: maintenanceDescription,
                    maintenanceCost: maintenanceCost,
                    assetNo: assetNo,
                    employeeNo: employeeNo,
                    agentNo: agentNo,
                    maintenanceNo: 'nan18' + (count + 1);
                };
                db.maintenance_add(client, data, function(result) {
                    responseData.code = 200;
                    responseData.message = '添加成功';
                    return res.json(responseData);
                })
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按资产维护编号查询
router.post('/maintenance/search', function(req, res, next) {
        var maintenanceNo = req.body.maintenanceNo;
        if (maintenanceNo) {
            var client = db.connectServer();
            db.maintenance_search(client, maintenanceNo, function(result) {
                if (result[0]) {
                    responseData.maintenance = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.maintenance = [];
                    responseData.code = 404;
                    responseData.message = '无此资产维护信息记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入资产维护编号';
            return res.json(responseData);
        }
    })
    //资产维护更新
router.post('/maintenance/update', function(req, res, next) {
        var maintenanceDate = req.body.maintenanceDate;
        var maintenanceDescription = req.body.maintenanceDescription;
        var maintenanceCost = req.body.maintenanceCost;
        var assetNo = req.body.assetNo;
        var employeeNo = req.body.employeeNo;
        var agentNo = req.body.agentNo;
        var maintenanceNo = req.body.maintenanceNo;
        if (maintenanceDate && maintenanceDescription && maintenanceCost && assetNo && employeeNo && agentNo && maintenanceNo) {
            var client = db.connectServer();
            var data = {
                maintenanceDate: maintenanceDate,
                maintenanceDescription: maintenanceDescription,
                maintenanceCost: maintenanceCost,
                assetNo: assetNo,
                employeeNo: employeeNo,
                agentNo: agentNo,
                maintenanceNo: maintenanceNo
            };
            db.maintenance_update(client, data, function(result) {
                responseData.code = 200;
                responseData.message = '更新成功';
                return res.json(responseData);
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //资产维护删除
router.delete('/maintenance/delete', function(req, res, next) {
    var maintenanceNo = req.query.maintenanceNo;
    if (maintenanceNo) {
        var client = db.connectServer();
        db.maintenance_search(client, maintenanceNo, function(result) {
            if (result[0]) {
                db.maintenance_delete(client, maintenanceNo, function(result) {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此资产维护信息';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '请输入资产维护编号';
        return res.json(responseData);
    }
})

//评估添加
router.post('/valuation/add', function(req, res, next) {
        var valuationDate = req.body.valuationDate;
        var valuationPrice = req.body.valuationPrice;
        var assetNo = req.body.assetNo;
        var employeeNo = req.body.employeeNo;
        var count;
        if (valuationDate && valuationPrice && assetNo && employeeNo) {
            var client = db.connectServer();
            db.valuation_search(client, assetNo, employeeNo, function(result) {
                if (result[0]) {
                    responseData.code = 404;
                    responseData.message = '此资产已经评估';
                } else {
                    db.valuation_search_all(client, function(result) {
                        count = result.length;
                        var data = {
                            valuationDate: valuationDate,
                            valuationPrice: valuationPrice,
                            assetNo: assetNo,
                            employeeNo: employeeNo,
                            valuationNo: 'NO0' + (count + 1)
                        };
                        db.valuation_add(client, data, function(result) {
                            responseData.code = 200;
                            responseData.message = '添加成功';
                            return res.json(responseData);
                        })
                    })
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //按评估编号查询
router.post('/valuation/serach', function(req, res, next) {
        var valuationNo = req.body.valuationNo;
        if (valuationNo) {
            var client = db.connectServer();
            db.valuation_search_No(client, valuationNo, function(result) {
                if (result[0]) {
                    responseData.valuation = result[0];
                    responseData.code = 200;
                    responseData.message = '查询成功';
                    return res.json(responseData);
                } else {
                    responseData.valuation = {};
                    responseData.code = 404;
                    responseData.message = '无此评估记录';
                    return res.json(responseData);
                }
            })
        } else {
            responseData.code = 404;
            responseData.message = '请输入评估编号';
            return res.json(responseData);
        }
    })
    //评估更新
router.post('/valuation/update', function(req, res, next) {
        var valuationDate = req.body.valuationDate;
        var valuationPrice = req.body.valuationPrice;
        var assetNo = req.body.assetNo;
        var employeeNo = req.body.employeeNo;
        var valuationNo = req.body.valuationNo;
        if (valuationDate && valuationPrice && assetNo && employeeNo && valuationNo) {
            var client = db.connectServer();
            var data = {
                valuationDate: valuationDate,
                valuationPrice: valuationPrice,
                assetNo: assetNo,
                employeeNo: employeeNo,
                valuationNo: valuationNo
            };
            db.valuation_update(client, data, function(result) {
                responseData.code = 200;
                responseData.message = '更新成功';
                return res.json(responseData);
            })
        } else {
            responseData.code = 404;
            responseData.message = '输入信息不完整';
            return res.json(responseData);
        }
    })
    //评估删除
router.delete('/valuation/delete', function(req, res, next) {
    var valuationNo = req.query.valuationNo;
    if (valuationNo) {
        var client = db.connectServer();
        db.valuation_search_No(client, valuationNo, function(result) {
            if (result[0]) {
                db.valuation_delete(client, valuationNo, function(result) {
                    responseData.code = 200;
                    responseData.message = '删除成功';
                    return res.json(responseData);
                })
            } else {
                responseData.code = 404;
                responseData.message = '无此评估信息';
                return res.json(responseData);
            }
        })
    } else {
        responseData.code = 404;
        responseData.message = '请输入评估编号';
        return res.json(responseData);
    }
})
module.exports = router;