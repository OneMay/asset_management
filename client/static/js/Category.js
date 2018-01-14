$(function() {
    $('#add').click(function() {
        var assetCategoryDescription = $("#assetCategoryDescription").val();
        $.ajax({
            url: '/admin/assetCategory/add',
            type: 'post',
            datatype: 'json',
            data: {
                assetCategoryDescription: assetCategoryDescription,
            },
            success: function(assetCategory) {
                if (assetCategory.code == 200) {
                    alert(assetCategory.message)
                } else {
                    alert(assetCategory.message)
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $('#delete').click(function() {
        var assetCategoryNo = $("#deleteId").val();
        $.ajax({
            url: '/admin/assetCategory/delete',
            type: 'delete',
            datatype: 'json',
            data: {
                assetCategoryNo: assetCategoryNo,
            },
            success: function(assetCategory) {
                alert(assetCategory.message)
            },
            error: function() {
                alert("no")
            }
        })
    })

    $('#lookup').click(function() {
        var assetCategoryNo = $("#lookupId").val();
        $.ajax({
            url: '/admin/assetCategory/search',
            type: 'post',
            datatype: 'json',
            data: {
                assetCategoryNo: assetCategoryNo,
            },
            success: function(assetCategory) {
                if (asserCategory.code == 200) {
                    var tr = "<thead><tr>" +
                        "<td>类别编号</td>" +
                        "<td>类别描述</td>"
                    "</tr></thead>" +
                    "<tr><td>" + assetCategory.assetCategory.assetCategoryNo + "</td><td>" + assetCategory.assetCategory.assetCategoryDescription + "</td></tr>"
                    $('.lookup').find('table').append(tr);
                } else {
                    alert(assetCategory.message)
                }
            },
            error: function() {
                alert("no")
            }
        })
    })
    $('#lookupAll').click(function() {
        $.ajax({
            url: '/admin/assetCategory/searchAll',
            type: 'post',
            datatype: 'json',
            data: {},
            success: function(assetCategory) {
                var thead = "<thead><tr>" +
                    "<td>类别编号</td>" +
                    "<td>类别描述</td>"
                "</tr></thead>"
                $('.lookup').find('table').append(thead);
                for (var i = 0; i < assetCategory.assetCategory.length; i++) {
                    var tr = "<tr><td>" + assetCategory.assetCategory[i].assetCategoryNo + "</td><td>" + assetCategory.assetCategory[i].assetCategoryDescription + "</td></tr>"
                    $('.lookup').find('table').append(tr);
                }
            },
            error: function() {
                alert("no")
            }
        })
    })

    $("#lookupAll").click(function() {
        $(this).attr("disabled", "disabled");
    });
})