$(function() {
    $('#add').click(function() {
        var statusDescription = $(".statusDescription").val();
        $.ajax({
            url: '/admin/status/add',
            type: 'post',
            dataType: 'json',
            data: {
                statusDescription: statusDescription,
            },
            success: function(status) {
                if (status.code == 200) {
                    alert(status.message)
                } else {
                    alert(status.message)
                }
            },
            error: function() {
                alert('no')
            }
        })
    })


    $('#delete').click(function() {
        var statuNo = $('#deleteStatuNo').val();
        $.ajax({
            url: '/admin/status/delete',
            type: 'delete',
            dataType: 'json',
            data: {
                statuNo: statuNo,
            },
            success: function(status) {
                if (status.code == 200) {
                    alert(status.message)
                } else {
                    alert(status.message)
                }
            },
            error: function() {
                alert("no")
            }
        })
    });

    $('#lookup').click(function() {
        var statuNo = $('#lookupStatuNo').val();
        $.ajax({
            url: '/admin/status/search',
            type: 'post',
            dataType: 'json',
            data: {
                statuNo: statuNo,
            },
            success: function(status) {
                if (status.code == 200) {
                    var tr = " <thead><tr>" +
                        "<td>状态编号</td>" +
                        "<td>状态描述</td>" +
                        "</tr></thead>" +
                        "<tr>" +
                        "<td title=" + status.status.statuNo + ">" + status.status.statuNo + "</td>" +
                        "<td title=" + status.status.statusDescription + ">" + status.status.statusDescription + "</td></tr>"
                    $('.lookup').find('table').append(tr);
                } else {
                    alert(status.message)
                }
            },
            error: function() {
                alert("no")
            }
        })
    });

    $('#lookupAll').click(function() {
        $.ajax({
            url: '/admin/status/searchAll',
            type: 'post',
            dataType: 'json',
            data: {},
            success: function(status) {
                if (document.getElementsByTagName('table')[0].childNodes) {
                    $('.lookup').find('table').html('');
                }
                if (status.code == 200) {
                    var thead = " <thead><tr>" +
                        "<td>状态编号</td>" +
                        "<td>状态描述</td>" +
                        "</tr></thead>"
                    $('.lookup').find('table').append(thead);
                    for (var i = 0; i < status.status.length; i++) {
                        var tr = "<tr>" +
                            "<td title=" + status.status[i].statuNo + ">" + status.status[i].statuNo + "</td>" +
                            "<td title=" + status.status[i].statusDescription + ">" + status.status[i].statusDescription +
                            "</td></tr>"
                        $('.lookup').find('table').append(tr);
                    }
                } else {
                    alert(status.message)
                }
            },
            error: function() {
                alert("no")
            }
        })
    });

})