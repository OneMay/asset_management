$(function() {
    $.ajax({
        url: '/admin/employee/search',
        type: 'post',
        dataType: 'json',
        data: {},
        success: function(userInfo) {
            for (var i = 0; i < userInfo.userInfo.length; i++) {
                var option = "<option>" + userInfo.userInfo[i].employeeNo + "</option>"
                $('.employeeNo').append(option)
            }
        },
        error: function() {

        }
    })

    $.ajax({
        url: '/admin/status/searchAll',
        type: 'post',
        dataType: 'json',
        data: {},
        success: function(status) {
            for (var i = 0; i < status.status.length; i++) {
                var option = "<option>" + status.status[i].statuNo + "</option>"
                $('.statuNo').append(option)
            }
        },
        error: function() {

        }
    })

    $.ajax({
        url: '/admin/assetCategory/searchAll',
        type: 'post',
        dataType: 'json',
        data: {},
        success: function(assetCategory) {
            for (var i = 0; i < assetCategory.assetCategory.length; i++) {
                var option = "<option>" + assetCategory.assetCategory[i].assetCategoryNo + "</option>"
                $('.assetCategoryNo').append(option)
            }
        },
        error: function() {

        }
    })
    $("#add").click(function() {
        var a = $(".asset");
        var assetDescription = a[0].value;
        var serialNo = a[1].value;
        var dateAcquired = a[2].value;
        var purchasePrice = a[3].value;
        var currentValue = a[4].value;
        var dateSold = a[5].value;
        var nextMaintenanceDate = a[6].value;
        var employeeNo = a[7].value;
        var assetCategoryNo = a[8].value;
        var statuNo = a[9].value;
        $.ajax({
            url: "/admin/asset/add",
            type: 'post',
            dataType: 'json',
            data: {
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
            },
            success: function() {
                alert("yes");
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#delete").click(function() {
        var assetNo = $('.deleteNo').val();
        $.ajax({
            url: "/admin/asset/delete",
            type: 'delete',
            dataType: 'json',
            data: {
                assetNo: assetNo,
            },
            success: function(asset) {
                if (asset.code == 200) {
                    alert('删除成功')
                } else {
                    alert('删除失败')
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $(".sure").click(function() {
        var a = $('.modifyAsset');
        var assetNo = $(".modifyNo").val();
        $.ajax({
            url: '/admin/asset/assetNo_search',
            type: 'post',
            datatype: 'json',
            data: {
                assetNo: assetNo,
            },
            success: function(asset) {
                if (asset.code == 200) {
                    $('.assetBox').css("display", "block");
                    a[0].value = asset.asset.assetDescription;
                    a[1].value = asset.asset.serialNo;
                    a[2].value = asset.asset.dateAcquired;
                    a[3].value = asset.asset.purchasePrice;
                    a[4].value = asset.asset.currentValue;
                    a[5].value = asset.asset.dateSold;
                    a[6].value = asset.asset.nextMaintenanceDate;
                    a[7].value = asset.asset.employeeNo;
                    a[8].value = asset.asset.assetCategoryNo;
                    a[9].value = asset.asset.statuNo
                } else {
                    $('.assetBox').css("display", "none");
                    alert("没有这个代理")
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#modify").click(function() {
        var a = $('.modifyAsset');
        var assetNo = $(".modifyNo").val();
        var assetDescription = a[0].value;
        var serialNo = a[1].value;
        var dateAcquired = a[2].value;
        var purchasePrice = a[3].value;
        var currentValue = a[4].value;
        var dateSold = a[5].value;
        var nextMaintenanceDate = a[6].value;
        var employeeNo = a[7].value;
        var assetCategoryNo = a[8].value;
        var statuNo = a[9].value;
        $.ajax({
            url: '/admin/asset/update',
            type: 'post',
            datatype: 'json',
            data: {
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
            },
            success: function() {
                alert("yes")
            },
            error: function() {
                alert("noq")
            }
        })
    })

    $("#lookupNo").click(function() {
        var assetNo = $(".lookupNo").val();
        $.ajax({
            url: '/admin/asset/assetNo_search',
            type: 'post',
            datatype: 'json',
            data: {
                assetNo: assetNo,
            },
            success: function(asset) {
                if (document.getElementsByTagName('table')[0].childNodes) {
                    $('.lookup').find('table').html('');
                }
                if (asset.code == 200) {
                    var tr = "<thead><tr>" +
                        "<td> 资产编号 </td>" +
                        "<td>资产描述</td>" +
                        "<td>序列号</td>" +
                        "<td>采购日期 </td>" +
                        "<td>采购价格</td>" +
                        "<td>现在市值</td>" +
                        "<td>售出日期</td>" +
                        "<td>下次维护日期</td>" +
                        "<td>员工编号</td>" +
                        "<td>类别编号</td>" +
                        "<td>状态编号</td>" +
                        "</tr></thead>" +
                        "<tr>" +
                        "<td title=" + asset.asset.assetNo + ">" + asset.asset.assetNo + "</td>" +
                        "<td title=" + asset.asset.assetDescription + ">" + asset.asset.assetDescription + "</td>" +
                        "<td title=" + asset.asset.serialNo + ">" + asset.asset.serialNo + "</td>" +
                        "<td title=" + asset.asset.dateAcquired.substring(0, 10) + ">" + asset.asset.dateAcquired.substring(0, 10) + "</td>" +
                        "<td title=" + asset.asset.purchasePrice + ">" + asset.asset.purchasePrice + "</td>" +
                        "<td title=" + asset.asset.currentValue + ">" + asset.asset.currentValue + "</td>" +
                        "<td title=" + asset.asset.dateSold.substring(0, 10) + ">" + asset.asset.dateSold.substring(0, 10) + "</td>" +
                        "<td title=" + asset.asset.nextMaintenanceDate.substring(0, 10) + ">" + asset.asset.nextMaintenanceDate.substring(0, 10) + "</td>" +
                        "<td title=" + asset.asset.employeeNo + ">" + asset.asset.employeeNo + "</td>" +
                        "<td title=" + asset.asset.assetCategoryNo + ">" + asset.asset.assetCategoryNo + "</td>" +
                        "<td title=" + asset.asset.statuNo + ">" + asset.asset.statuNo + "</td>" +
                        "</tr>"
                    $('.lookup').find('table').append(tr)
                } else {
                    $('.lookup').find('table').html(asset.message)
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#lookupName").click(function() {
        var assetDescription = $(".lookupName").val();
        $.ajax({
            url: '/admin/asset/assetDescription_search',
            type: 'post',
            datatype: 'json',
            data: {
                assetDescription: assetDescription,
            },
            success: function(asset) {
                if (asset.code == 200) {
                    var thead = "<thead><tr>" +
                        "<td> 资产编号 </td>" +
                        "<td>资产描述</td>" +
                        "<td>序列号</td>" +
                        "<td>采购日期 </td>" +
                        "<td>采购价格</td>" +
                        "<td>现在市值</td>" +
                        "<td>售出日期</td>" +
                        "<td>下次维护日期</td>" +
                        "<td>员工编号</td>" +
                        "<td>类别编号</td>" +
                        "<td>状态编号</td>" +
                        "</tr></thead>"
                    $('.lookup').find('table').html(thead)
                    for (var i = 0; i < asset.asset.length; i++) {
                        var tr = "<tr>" +
                            "<td title=" + asset.asset[i].assetNo + ">" + asset.asset[i].assetNo + "</td>" +
                            "<td title=" + asset.asset[i].assetDescription + ">" + asset.asset[i].assetDescription + "</td>" +
                            "<td title=" + asset.asset[i].serialNo + ">" + asset.asset[i].serialNo + "</td>" +
                            "<td title=" + asset.asset[i].dateAcquired.substring(0, 10) + ">" + asset.asset[i].dateAcquired.substring(0, 10) + "</td>" +
                            "<td title=" + asset.asset[i].purchasePrice + ">" + asset.asset[i].purchasePrice + "</td>" +
                            "<td title=" + asset.asset[i].currentValue + ">" + asset.asset[i].currentValue + "</td>" +
                            "<td title=" + asset.asset[i].dateSold.substring(0, 10) + ">" + asset.asset[i].dateSold.substring(0, 10) + "</td>" +
                            "<td title=" + asset.asset[i].nextMaintenanceDate.substring(0, 10) + ">" + asset.asset[i].nextMaintenanceDate.substring(0, 10) + "</td>" +
                            "<td title=" + asset.asset[i].employeeNo + ">" + asset.asset[i].employeeNo + "</td>" +
                            "<td title=" + asset.asset[i].assetCategoryNo + ">" + asset.asset[i].assetCategoryNo + "</td>" +
                            "<td title=" + asset.asset[i].statuNo + ">" + asset.asset[i].statuNo + "</td>" +
                            "</tr>"
                        $('.lookup').find('table').append(tr)
                    }
                } else {
                    $('.lookup').find('table').html(asset.message)
                }
            },
            error: function() {
                alert("no")
            }
        })
    })
    $("#lookupAll").click(function() {
        $.ajax({
            url: '/admin/asset/searchAll',
            type: 'post',
            datatype: 'json',
            data: {},
            success: function(asset) {
                if (asset.code == 200) {
                    var thead = "<thead><tr>" +
                        "<td> 资产编号 </td>" +
                        "<td>资产描述</td>" +
                        "<td>序列号</td>" +
                        "<td>采购日期 </td>" +
                        "<td>采购价格</td>" +
                        "<td>现在市值</td>" +
                        "<td>售出日期</td>" +
                        "<td>下次维护日期</td>" +
                        "<td>员工编号</td>" +
                        "<td>类别编号</td>" +
                        "<td>状态编号</td>" +
                        "</tr></thead>"
                    $('.lookup').find('table').html(thead)
                    for (var i = 0; i < asset.asset.length; i++) {
                        var tr = "<tr>" +
                            "<td title=" + asset.asset[i].assetNo + ">" + asset.asset[i].assetNo + "</td>" +
                            "<td title=" + asset.asset[i].assetDescription + ">" + asset.asset[i].assetDescription + "</td>" +
                            "<td title=" + asset.asset[i].serialNo + ">" + asset.asset[i].serialNo + "</td>" +
                            "<td title=" + asset.asset[i].dateAcquired.substring(0, 10) + ">" + asset.asset[i].dateAcquired.substring(0, 10) + "</td>" +
                            "<td title=" + asset.asset[i].purchasePrice + ">" + asset.asset[i].purchasePrice + "</td>" +
                            "<td title=" + asset.asset[i].currentValue + ">" + asset.asset[i].currentValue + "</td>" +
                            "<td title=" + asset.asset[i].dateSold.substring(0, 10) + ">" + asset.asset[i].dateSold.substring(0, 10) + "</td>" +
                            "<td title=" + asset.asset[i].nextMaintenanceDate.substring(0, 10) + ">" + asset.asset[i].nextMaintenanceDate.substring(0, 10) + "</td>" +
                            "<td title=" + asset.asset[i].employeeNo + ">" + asset.asset[i].employeeNo + "</td>" +
                            "<td title=" + asset.asset[i].assetCategoryNo + ">" + asset.asset[i].assetCategoryNo + "</td>" +
                            "<td title=" + asset.asset[i].statuNo + ">" + asset.asset[i].statuNo + "</td>" +
                            "</tr>"
                        $('.lookup').find('table').append(tr)
                    }
                } else {
                    $('.lookup').find('table').html(asset.message)
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

})