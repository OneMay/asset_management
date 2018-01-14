$(function() {
    var assetNo;
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

    $.ajax({
        url: '/admin/agent/searchAll',
        type: 'post',
        dataType: 'json',
        data: {},
        success: function(agent) {
            for (var i = 0; i < agent.agent.length; i++) {
                var option = "<option>" + agent.agent[i].agentNo + "</option>"
                $('.agentNo').append(option)
            }
        },
        error: function() {

        }
    })

    $("#add").click(function() {
        var a = $('.maintence');
        var assetNo = a[0].value;
        var employeeNo = a[1].value;
        var agentNo = a[2].value;
        var maintenanceDate = a[3].value;
        var maintenanceDescription = a[4].value;
        var maintenanceCost = a[5].value;
        $.ajax({
            url: '/admin/maintenance/add',
            type: 'post',
            dataType: 'json',
            data: {
                maintenanceDate: maintenanceDate,
                maintenanceDescription: maintenanceDescription,
                maintenanceCost: maintenanceCost,
                assetNo: assetNo,
                employeeNo: employeeNo,
                agentNo: agentNo,
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
        var maintenanceNo = $('.deleteNo').val();
        $.ajax({
            url: "/admin/maintenance/delete",
            type: 'delete',
            dataType: 'json',
            data: {
                maintenanceNo: maintenanceNo,
            },
            success: function(maintenance) {
                if (maintenance.code == 200) {
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
        var a = $('.modifyMaintence');
        var maintenanceNo = $(".modifyNo").val();
        $.ajax({
            url: '/admin/maintenance/search',
            type: 'post',
            datatype: 'json',
            data: {
                maintenanceNo: maintenanceNo,
            },
            success: function(maintenance) {
                if (maintenance.code == 200) {
                    $('.maintenceBox').css("display", "block");
                    a[0].value = maintenance.maintenance.assetNo;
                    a[1].value = maintenance.maintenance.employeeNo;
                    a[2].value = maintenance.maintenance.agentNo;
                    a[3].value = maintenance.maintenance.maintenanceDate;
                    a[4].value = maintenance.maintenance.maintenanceDescription;
                    a[5].value = maintenance.maintenance.maintenanceCost;
                } else {
                    $('.maintenceBox').css("display", "none");
                    alert("没有这个代理")
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#modify").click(function() {
        var a = $('.modifyMaintence');
        var maintenanceNo = $(".modifyNo").val();
        var assetNo = a[0].value;
        var employeeNo = a[1].value;
        var agentNo = a[2].value;
        var maintenanceDate = a[3].value;
        var maintenanceDescription = a[4].value;
        var maintenanceCost = a[5].value;
        $.ajax({
            url: '/admin/maintenance/update',
            type: 'post',
            datatype: 'json',
            data: {
                maintenanceDate: maintenanceDate,
                maintenanceDescription: maintenanceDescription,
                maintenanceCost: maintenanceCost,
                assetNo: assetNo,
                employeeNo: employeeNo,
                agentNo: agentNo,
                maintenanceNo: maintenanceNo
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
        var maintenanceNo = $(".lookupNo").val();
        $.ajax({
            url: '/admin/maintenance/search',
            type: 'post',
            datatype: 'json',
            data: {
                maintenanceNo: maintenanceNo,
            },
            success: function(maintenance) {
                if (document.getElementsByTagName('table')[0].childNodes) {
                    $('.lookup').find('table').html('');
                }
                if (maintenance.code == 200) {
                    var tr = " <thead><tr>" +
                        "<td>维护编号</td>" +
                        "<td>资产编号</td>" +
                        "<td>员工编号</td>" +
                        "<td>代理编号</td>" +
                        "<td>维护日期</td>" +
                        "<td>维护描述</td>" +
                        "<td>维护成本</td>" +
                        "</tr></thead>" +
                        "<tr>" +
                        "<td title=" + maintenance.maintenance.maintenanceNo + ">" + maintenance.maintenance.maintenanceNo + "</td>" +
                        "<td title=" + maintenance.maintenance.assetNo + ">" + maintenance.maintenance.assetNo + "</td>" +
                        "<td title=" + maintenance.maintenance.employeeNo + ">" + maintenance.maintenance.employeeNo + "</td>" +
                        "<td title=" + maintenance.maintenance.agentNo + ">" + maintenance.maintenance.agentNo + "</td>" +
                        "<td title=" + maintenance.maintenance.maintenanceDate.substring(0, 10) + ">" + maintenance.maintenance.maintenanceDate.substring(0, 10) + "</td>" +
                        "<td title=" + maintenance.maintenance.maintenanceDescription + ">" + maintenance.maintenance.maintenanceDescription + "</td>" +
                        "<td title=" + maintenance.maintenance.maintenanceCost + ">" + maintenance.maintenance.maintenanceCost + "</td>" +
                        "</tr>"
                    $('.lookup').find('table').append(tr)
                } else {
                    $('.maintenceBox').css("display", "none");
                    alert("没有这个代理")
                }
            },
            error: function() {
                alert("no")
            }
        })
    })
})