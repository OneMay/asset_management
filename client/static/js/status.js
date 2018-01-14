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
            success: function() {
                alert("yes")
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
            success: function() {
                alert("yes")
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
                    alert("没有这个维护")
                }
            },
            error: function() {
                alert("no")
            }
        })
    });

})