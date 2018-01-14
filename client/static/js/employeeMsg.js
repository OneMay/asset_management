$(function() {
    var employeeNo = $('#EmployeeNO').html();
    $('.peoplemsg').click(function() {
        $.ajax({
            url: '/api/employee/one',
            type: 'post',
            dataType: 'json',
            data: { employeeNo: employeeNo },
            success: function(employee) {
                if (employee.code == 200) {
                    var tr = "<thead><tr>" +
                        "<td>员工编号 </td>" +
                        "<td>员工姓名</td>" +
                        "<td>员工性别</td>" +
                        "<td>员工地址 </td>" +
                        "<td>工作电话</td>" +
                        "<td>家庭电话</td>" +
                        "<td>邮箱地址</td>" +
                        "<td>社会号码</td>" +
                        "<td>出生日期</td>" +
                        "<td>员工职位</td>" +
                        "<td>员工工资</td>" +
                        "<td>入职日期</td>" +
                        "</tr></thead>" +
                        "<tr>" +
                        "<td title=" + employee.employee.employeeNo + ">" + employee.employee.employeeNo + "</td>" +
                        "<td title=" + employee.employee.name + ">" + employee.employee.name + "</td>" +
                        "<td title=" + employee.employee.sex + ">" + employee.employee.sex + "</td>" +
                        "<td title=" + employee.employee.address + ">" + employee.employee.address + "</td>" +
                        "<td title=" + employee.employee.workTelExt + ">" + employee.employee.workTelExt + "</td>" +
                        "<td title=" + employee.employee.homeTelNo + ">" + employee.employee.homeTelNo + "</td>" +
                        "<td title=" + employee.employee.emplEmailAddress + ">" + employee.employee.emplEmailAddress + "</td>" +
                        "<td title=" + employee.employee.sociaSecurityNumber + ">" + employee.employee.sociaSecurityNumber + "</td>" +
                        "<td title=" + employee.employee.DOB.substring(0, 10) + ">" + employee.employee.DOB.substring(0, 10) + "</td>" +
                        "<td title=" + employee.employee.position + ">" + employee.employee.position + "</td>" +
                        "<td title=" + employee.employee.salary + ">" + employee.employee.salary + "</td>" +
                        "<td title=" + employee.employee.dateStarted.substring(0, 10) + ">" + employee.employee.dateStarted.substring(0, 10) + "</td>" +
                        "</tr>"
                    $('#box').find('table').html(tr)
                } else {
                    $('#box').find('table').html(employee.message)
                }
            },
            error: function() {
                alert("查找失败")
            }
        })
    })

    $('.myasset').click(function() {
        $.ajax({
            url: '/api/employee/assetSearch',
            type: 'post',
            dataType: 'json',
            data: { employeeNo: employeeNo },
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
                    $('#box').find('table').html(thead)
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
                        $('#box').find('table').append(tr)
                    }
                } else {
                    $('#box').find('table').html(employee.message)
                }
            },
            error: function() {
                alert("查找失败")
            }
        })
    })
})