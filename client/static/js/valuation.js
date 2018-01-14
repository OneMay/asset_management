$(function() {
    $.ajax({
        url: '/admin/asset/searchAll',
        type: 'post',
        dataType: 'json',
        data: {},
        success: function(asset) {
            for (var i = 0; i < asset.asset.length; i++) {
                var assetNo = asset.asset[i].assetNo
                var option = "<option>" + assetNo + "</option>"
                $('.assetNo').append(option)
            }
        },
        error: function() {

        }
    })

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

    $('#add').click(function() {
        var a = $('.value');
        var assetNo = a[0].value;
        var employeeNo = a[1].value;
        var valuationDate = a[2].value;
        var valuationPrice = a[3].value;
        $.ajax({
            url: '/admin/valuation/add',
            type: 'post',
            dataType: 'json',
            data: {
                valuationDate: valuationDate,
                valuationPrice: valuationPrice,
                assetNo: assetNo,
                employeeNo: employeeNo,
            },
            success: function() {
                alert('yes')
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#delete").click(function() {
        var valuationNo = $('.deleteNo').val();
        $.ajax({
            url: "/admin/valuation/delete",
            type: 'delete',
            dataType: 'json',
            data: {
                valuationNo: valuationNo,
            },
            success: function(valuation) {
                if (valuation.code == 200) {
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
        var a = $('.modifyValua');
        var valuationNo = $(".modifyNo").val();
        $.ajax({
            url: '/admin/valuation/serach',
            type: 'post',
            datatype: 'json',
            data: {
                valuationNo: valuationNo,
            },
            success: function(valuation) {
                if (valuation.code == 200) {
                    $('.valuaBox').css("display", "block");
                    a[0].value = valuation.valuation.assetNo;
                    a[1].value = valuation.valuation.employeeNo;
                    a[2].value = valuation.valuation.valuationDate;
                    a[3].value = valuation.valuation.valuationPrice;
                } else {
                    $('.valuaBox').css("display", "none");
                    alert("没有这个代理")
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#modify").click(function() {
        var a = $('.modifyValua');
        var assetNo = a[0].value;
        var employeeNo = a[1].value;
        var valuationDate = a[2].value;
        var valuationPrice = a[3].value;
        var valuationNo = $(".modifyNo").val();
        $.ajax({
            url: '/admin/valuation/update',
            type: 'post',
            datatype: 'json',
            data: {
                valuationDate: valuationDate,
                valuationPrice: valuationPrice,
                assetNo: assetNo,
                employeeNo: employeeNo,
                valuationNo: valuationNo
            },
            success: function() {
                alert("yes")
            },
            error: function() {
                alert("noq")
            }
        })
    })

    $("#lookup").click(function() {
        var valuationNo = $(".lookupNo").val();
        $.ajax({
            url: '/admin/valuation/serach',
            type: 'post',
            datatype: 'json',
            data: {
                valuationNo: valuationNo,
            },
            success: function(valuation) {
                if (valuation.code == 200) {
                    var tr = " <thead><tr>" +
                        "<td>资产编号</td>" +
                        "<td>员工编号</td>" +
                        "<td>评估日期</td>" +
                        "<td>评估价格</td>" +
                        "</tr></thead>" +
                        "<tr>" +
                        "<td title=" + valuation.valuation.assetNo + ">" + valuation.valuation.assetNo + "</td>" +
                        "<td title=" + valuation.valuation.employeeNo + ">" + valuation.valuation.employeeNo + "</td>" +
                        "<td title=" + valuation.valuation.valuationDate + ">" + valuation.valuation.valuationDate + "</td>" +
                        "<td title=" + valuation.valuation.valuationPrice + ">" + valuation.valuation.valuationPrice + "</td>" +
                        "</tr>"
                    $('.lookup').find('table').append(tr);
                } else {
                    $('.valuaBox').css("display", "none");
                    alert("没有这个代理")
                }
            },
            error: function() {
                alert("no")
            }
        })
    })
})