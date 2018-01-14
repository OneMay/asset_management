$(function() {
    $("#add").click(function() {
        var a = $('.agent');
        var agentName = a[0].value;
        var agentStreet = a[1].value;
        var agentCity = a[2].value;
        var agentState = a[3].value;
        var agentZipCode = a[4].value;
        var agentTelNo = a[5].value;
        var agentFaxNo = a[6].value;
        var agentEmailAddress = a[7].value;
        var agentWebAdderss = a[8].value;
        var contactName = a[9].value;
        var contactTelNo = a[10].value
        var contactFaxNo = a[11].value
        var contactEmailAddress = a[12].value;
        $.ajax({
            url: '/admin/agent/add',
            type: 'post',
            datatype: 'json',
            data: {
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
        var a = $('.modifyAgent');
        var agentNo = $(".agentNo").val();
        $.ajax({
            url: '/admin/agent/agentNo_search',
            type: 'post',
            datatype: 'json',
            data: {
                agentNo: agentNo,
            },
            success: function(agent) {
                if (agent.code == 200) {
                    $('.agentBox').css("display", "block");
                    a[0].value = agent.agent.agentName;
                    a[1].value = agent.agent.agentStreet;
                    a[2].value = agent.agent.agentCity;
                    a[3].value = agent.agent.agentState;
                    a[4].value = agent.agent.agentZipCode;
                    a[5].value = agent.agent.agentTelNo;
                    a[6].value = agent.agent.agentFaxNo;
                    a[7].value = agent.agent.agentEmailAddress;
                    a[8].value = agent.agent.agentWebAdderss;
                    a[9].value = agent.agent.contactName;
                    a[10].value = agent.agent.contactTelNo;
                    a[11].value = agent.agent.contactFaxNo;
                    a[12].value = agent.agent.contactEmailAddress;
                } else {
                    $('.agentBox').css("display", "none");
                    alert("没有这个代理")
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#modify").click(function() {
        var a = $('.modifyAgent');
        var agentNo = $(".agentNo").val();
        var agentName = a[0].value;
        var agentStreet = a[1].value;
        var agentCity = a[2].value;
        var agentState = a[3].value;
        var agentZipCode = a[4].value;
        var agentTelNo = a[5].value;
        var agentFaxNo = a[6].value;
        var agentEmailAddress = a[7].value;
        var agentWebAdderss = a[8].value;
        var contactName = a[9].value;
        var contactTelNo = a[10].value
        var contactFaxNo = a[11].value
        var contactEmailAddress = a[12].value;
        $.ajax({
            url: '/admin/agent/update',
            type: 'post',
            datatype: 'json',
            data: {
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
        var agentNo = $(".deleteNo").val();
        $.ajax({
            url: '/admin/agent/delete',
            type: 'delete',
            datatype: 'json',
            data: {
                agentNo: agentNo,
            },
            success: function(agent) {
                if (agent.code == 200) {
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
        var agentNo = $(".lookupNo").val();
        $.ajax({
            url: '/admin/agent/agentNo_search',
            type: 'post',
            datatype: 'json',
            data: {
                agentNo: agentNo,
            },
            success: function(agent) {
                if (document.getElementsByTagName('table')[0].childNodes) {
                    $('.lookup').find('table').html('');
                }
                if (agent.code == 200) {
                    var tr = "<thead><tr>" +
                        "<td>代理编号 </td>" +
                        "<td>代理商名 </td>" +
                        "<td>街道</td>" +
                        "<td>城市</td>" +
                        "<td>县市</td>" +
                        "<td>邮政编码</td>" +
                        "<td>电话</td>" +
                        "<td>传真</td>" +
                        "<td>邮箱</td>" +
                        "<td>网址</td>" +
                        "<td>联系人</td>" +
                        "<td>联系人电话</td>" +
                        "<td>联系人传真</td>" +
                        "<td>联系人邮箱</td>" +
                        "</tr></thead>" +
                        "<tr>" +
                        "<td title=" + agent.agent.agentNo + ">" + agent.agent.agentNo + "</td>" +
                        "<td title=" + agent.agent.agentName + ">" + agent.agent.agentName + "</td>" +
                        "<td title=" + agent.agent.agentStreet + ">" + agent.agent.agentStreet + "</td>" +
                        "<td title=" + agent.agent.agentCity + ">" + agent.agent.agentCity + "</td>" +
                        "<td title=" + agent.agent.agentState + ">" + agent.agent.agentState + "</td>" +
                        "<td title=" + agent.agent.agentZipCode + ">" + agent.agent.agentZipCode + "</td>" +
                        "<td title=" + agent.agent.agentTelNo + ">" + agent.agent.agentTelNo + "</td>" +
                        "<td title=" + agent.agent.agentFaxNo + ">" + agent.agent.agentFaxNo + "</td>" +
                        "<td title=" + agent.agent.agentEmailAddress + ">" + agent.agent.agentEmailAddress + "</td>" +
                        "<td title=" + agent.agent.agentWebAdderss + ">" + agent.agent.agentWebAdderss + "</td>" +
                        "<td title=" + agent.agent.contactName + ">" + agent.agent.contactName + "</td>" +
                        "<td title=" + agent.agent.contactTelNo + ">" + agent.agent.contactTelNo + "</td>" +
                        "<td title=" + agent.agent.contactFaxNo + ">" + agent.agent.contactFaxNo + "</td>" +
                        "<td title=" + agent.agent.contactEmailAddress + ">" + agent.agent.contactEmailAddress + "</td>" +
                        "</tr>"
                    $('.lookup').find('table').append(tr)
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
            url: '/admin/agent/searchAll',
            type: 'post',
            datatype: 'json',
            data: {},
            success: function(agent) {
                if (agent.code == 200) {
                    var thead = "<thead><tr>" +
                        "<td>代理编号 </td>" +
                        "<td>代理商名 </td>" +
                        "<td>街道</td>" +
                        "<td>城市</td>" +
                        "<td>县市</td>" +
                        "<td>邮政编码</td>" +
                        "<td>电话</td>" +
                        "<td>传真</td>" +
                        "<td>邮箱</td>" +
                        "<td>网址</td>" +
                        "<td>联系人</td>" +
                        "<td>联系人电话</td>" +
                        "<td>联系人传真</td>" +
                        "<td>联系人邮箱</td>" +
                        "</tr></thead>"
                    $('.lookup').find('table').html(thead)
                    for (var i = 0; i < agent.agent.length; i++) {
                        var tr = "<tr>" +
                            "<td title=" + agent.agent[i].agentNo + ">" + agent.agent[i].agentNo + "</td>" +
                            "<td title=" + agent.agent[i].agentName + ">" + agent.agent[i].agentName + "</td>" +
                            "<td title=" + agent.agent[i].agentStreet + ">" + agent.agent[i].agentStreet + "</td>" +
                            "<td title=" + agent.agent[i].agentCity + ">" + agent.agent[i].agentCity + "</td>" +
                            "<td title=" + agent.agent[i].agentState + ">" + agent.agent[i].agentState + "</td>" +
                            "<td title=" + agent.agent[i].agentZipCode + ">" + agent.agent[i].agentZipCode + "</td>" +
                            "<td title=" + agent.agent[i].agentTelNo + ">" + agent.agent[i].agentTelNo + "</td>" +
                            "<td title=" + agent.agent[i].agentFaxNo + ">" + agent.agent[i].agentFaxNo + "</td>" +
                            "<td title=" + agent.agent[i].agentEmailAddress + ">" + agent.agent[i].agentEmailAddress + "</td>" +
                            "<td title=" + agent.agent[i].agentWebAdderss + ">" + agent.agent[i].agentWebAdderss + "</td>" +
                            "<td title=" + agent.agent[i].contactName + ">" + agent.agent[i].contactName + "</td>" +
                            "<td title=" + agent.agent[i].contactTelNo + ">" + agent.agent[i].contactTelNo + "</td>" +
                            "<td title=" + agent.agent[i].contactFaxNo + ">" + agent.agent[i].contactFaxNo + "</td>" +
                            "<td title=" + agent.agent[i].contactEmailAddress + ">" + agent.agent[i].contactEmailAddress + "</td>" +
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
})