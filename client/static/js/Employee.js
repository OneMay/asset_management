$(function() {
    $("#add").click(function() {
        var a = $('.employee');
        var name = a[0].value;
        var sex = a[1].value;
        var address = a[2].value;
        var workTelExt = a[3].value;
        var homeTelNo = a[4].value;
        var emplEmailAddress = a[5].value;
        var sociaSecurityNumber = a[6].value;
        var DOB = a[7].value;
        var position = a[8].value;
        var salary = a[9].value;
        var dateStarted = a[10].value
        $.ajax({
            url: '/admin/employee/add',
            type: 'post',
            datatype: 'json',
            data: {
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
            },
            success: function() {
                alert("yes")
            },
            error: function() {
                alert("no")
            }
        })
    })

    $(".sure").click(function() {
        var a = $('.modifyEmployee');
        var employeeNo = $(".modifyNo").val();
        $.ajax({
            url: '/admin/employee/employeeNo_search',
            type: 'post',
            datatype: 'json',
            data: {
                employeeNo: employeeNo,
            },
            success: function(userInfo) {
                if (userInfo.code == 200) {
                    $('.employeeBox').css("display", "block");
                    a[0].value = userInfo.userInfo.name;
                    a[1].value = userInfo.userInfo.sex;
                    a[2].value = userInfo.userInfo.address;
                    a[3].value = userInfo.userInfo.workTelExt;
                    a[4].value = userInfo.userInfo.homeTelNo;
                    a[5].value = userInfo.userInfo.emplEmailAddress;
                    a[6].value = userInfo.userInfo.sociaSecurityNumber;
                    a[7].value = userInfo.userInfo.DOB;
                    a[8].value = userInfo.userInfo.position;
                    a[9].value = userInfo.userInfo.salary;
                    a[10].value = userInfo.userInfo.dateStarted;
                } else {
                    $('.employeeBox').css("display", "none");
                    alert("没有这个员工")
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#modify").click(function() {
        var a = $('.modifyEmployee');
        var employeeNo = $(".modifyNo").val();
        var name = a[0].value;
        var sex = a[1].value;
        var address = a[2].value;
        var workTelExt = a[3].value;
        var homeTelNo = a[4].value;
        var emplEmailAddress = a[5].value;
        var sociaSecurityNumber = a[6].value;
        var DOB = a[7].value;
        var position = a[8].value;
        var salary = a[9].value
        var dateStarted = a[10].value
        $.ajax({
            url: '/admin/employee/update',
            type: 'post',
            datatype: 'json',
            data: {
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
            },
            success: function() {
                alert("yes")
            },
            error: function() {
                alert("noq")
            }
        })
    })

    $("#delete").click(function() {
        var employeeNo = $(".deleteNo").val();
        $.ajax({
            url: '/admin/employee/delete',
            type: 'delete',
            datatype: 'json',
            data: {
                employeeNo: employeeNo,
            },
            success: function(employee) {
                if (employee.code == 200) {
                    alert("删除成功");
                } else {
                    alert("没有这个代理")
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#lookupNo").click(function() {
        var employeeNo = $(".lookupNo").val();
        $.ajax({
            url: '/admin/employee/employeeNo_search',
            type: 'post',
            datatype: 'json',
            data: {
                employeeNo: employeeNo,
            },
            success: function(userInfo) {
                if (document.getElementsByTagName('table')[0].childNodes) {
                    $('.lookup').find('table').html('');
                }
                if (userInfo.code == 200) {
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
                        "<td title=" + userInfo.userInfo.employeeNo + ">" + userInfo.userInfo.employeeNo + "</td>" +
                        "<td title=" + userInfo.userInfo.name + ">" + userInfo.userInfo.name + "</td>" +
                        "<td title=" + userInfo.userInfo.sex + ">" + userInfo.userInfo.sex + "</td>" +
                        "<td title=" + userInfo.userInfo.address + ">" + userInfo.userInfo.address + "</td>" +
                        "<td title=" + userInfo.userInfo.workTelExt + ">" + userInfo.userInfo.workTelExt + "</td>" +
                        "<td title=" + userInfo.userInfo.homeTelNo + ">" + userInfo.userInfo.homeTelNo + "</td>" +
                        "<td title=" + userInfo.userInfo.emplEmailAddress + ">" + userInfo.userInfo.emplEmailAddress + "</td>" +
                        "<td title=" + userInfo.userInfo.sociaSecurityNumber + ">" + userInfo.userInfo.sociaSecurityNumber + "</td>" +
                        "<td title=" + userInfo.userInfo.DOB.substring(0, 10) + ">" + userInfo.userInfo.DOB.substring(0, 10) + "</td>" +
                        "<td title=" + userInfo.userInfo.position + ">" + userInfo.userInfo.position + "</td>" +
                        "<td title=" + userInfo.userInfo.salary + ">" + userInfo.userInfo.salary + "</td>" +
                        "<td title=" + userInfo.userInfo.dateStarted.substring(0, 10) + ">" + userInfo.userInfo.dateStarted.substring(0, 10) + "</td>" +
                        "</tr>"
                    $('.lookup').find('table').append(tr)
                } else {
                    $('.lookup').find('table').html(userInfo.message);
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#lookupName").click(function() {
        var name = $(".lookupName").val();
        $.ajax({
            url: '/admin/employee/name_search',
            type: 'post',
            datatype: 'json',
            data: {
                name: name,
            },
            success: function(userInfo) {
                if (userInfo.code == 200) {
                    var thead = "<thead><tr>" +
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
                        "</tr></thead>"
                    $('.lookup').find('table').html(thead)
                    for (var i = 0; i < userInfo.userInfo.length; i++) {
                        var tr = "<tr>" +
                            "<td title=" + userInfo.userInfo[i].employeeNo + ">" + userInfo.userInfo[i].employeeNo + "</td>" +
                            "<td title=" + userInfo.userInfo[i].name + ">" + userInfo.userInfo[i].name + "</td>" +
                            "<td title=" + userInfo.userInfo[i].sex + ">" + userInfo.userInfo[i].sex + "</td>" +
                            "<td title=" + userInfo.userInfo[i].address + ">" + userInfo.userInfo[i].address + "</td>" +
                            "<td title=" + userInfo.userInfo[i].workTelExt + ">" + userInfo.userInfo[i].workTelExt + "</td>" +
                            "<td title=" + userInfo.userInfo[i].homeTelNo + ">" + userInfo.userInfo[i].homeTelNo + "</td>" +
                            "<td title=" + userInfo.userInfo[i].emplEmailAddress + ">" + userInfo.userInfo[i].emplEmailAddress + "</td>" +
                            "<td title=" + userInfo.userInfo[i].sociaSecurityNumber + ">" + userInfo.userInfo[i].sociaSecurityNumber + "</td>" +
                            "<td title=" + userInfo.userInfo[i].DOB.substring(0, 10) + ">" + userInfo.userInfo[i].DOB.substring(0, 10) + "</td>" +
                            "<td title=" + userInfo.userInfo[i].position + ">" + userInfo.userInfo[i].position + "</td>" +
                            "<td title=" + userInfo.userInfo[i].salary + ">" + userInfo.userInfo[i].salary + "</td>" +
                            "<td title=" + userInfo.userInfo[i].dateStarted.substring(0, 10) + ">" + userInfo.userInfo[i].dateStarted.substring(0, 10) + "</td>" +
                            "</tr>"
                        $('.lookup').find('table').append(tr)
                    }
                } else {
                    $('.lookup').find('table').append()
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#lookupAll").click(function() {
        $.ajax({
            url: '/admin/employee/search',
            type: 'post',
            dataType: 'json',
            data: {},
            success: function(userInfo) {
                var thead = "<thead><tr>" +
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
                    "</tr></thead>"
                $('.lookup').find('table').html(thead)
                for (var i = 0; i < userInfo.userInfo.length; i++) {
                    var tr = "<tr>" +
                        "<td title=" + userInfo.userInfo[i].employeeNo + ">" + userInfo.userInfo[i].employeeNo + "</td>" +
                        "<td title=" + userInfo.userInfo[i].name + ">" + userInfo.userInfo[i].name + "</td>" +
                        "<td title=" + userInfo.userInfo[i].sex + ">" + userInfo.userInfo[i].sex + "</td>" +
                        "<td title=" + userInfo.userInfo[i].address + ">" + userInfo.userInfo[i].address + "</td>" +
                        "<td title=" + userInfo.userInfo[i].workTelExt + ">" + userInfo.userInfo[i].workTelExt + "</td>" +
                        "<td title=" + userInfo.userInfo[i].homeTelNo + ">" + userInfo.userInfo[i].homeTelNo + "</td>" +
                        "<td title=" + userInfo.userInfo[i].emplEmailAddress + ">" + userInfo.userInfo[i].emplEmailAddress + "</td>" +
                        "<td title=" + userInfo.userInfo[i].sociaSecurityNumber + ">" + userInfo.userInfo[i].sociaSecurityNumber + "</td>" +
                        "<td title=" + userInfo.userInfo[i].DOB.substring(0, 10) + ">" + userInfo.userInfo[i].DOB.substring(0, 10) + "</td>" +
                        "<td title=" + userInfo.userInfo[i].position + ">" + userInfo.userInfo[i].position + "</td>" +
                        "<td title=" + userInfo.userInfo[i].salary + ">" + userInfo.userInfo[i].salary + "</td>" +
                        "<td title=" + userInfo.userInfo[i].dateStarted.substring(0, 10) + ">" + userInfo.userInfo[i].dateStarted.substring(0, 10) + "</td>" +
                        "</tr>"
                    $('.lookup').find('table').append(tr)
                }
            },
            error: function() {

            }
        })
    })
    $("#lookupAll").click(function() {
        $(this).attr("disabled", "disabled");
    });
})