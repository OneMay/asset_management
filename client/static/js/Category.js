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
            success: function() {
                alert("yes")
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
            success: function() {
                alert("yes")
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
                var tr = "<tr><td>" + assetCategory.assetCategory.assetCategoryNo + "</td><td>" + assetCategory.assetCategory.assetCategoryDescription + "</td></tr>"
                $('.lookup').find('table').append(tr);
            },
            error: function() {
                alert("no")
            }
        })
    })
})