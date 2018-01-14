$(function() {
    $('#login').click(function() {
        var employeeNo = $(".employeeNo").val();
        var password = $(".password").val();
        $.ajax({
            url: '/api/user/login',
            type: 'post',
            dataType: 'json',
            data: {
                employeeNo: employeeNo,
                password: password
            },
            success: function(data) {
                if (data.code == 200) {
                    window.location.href = '/Assetmsg';
                } else {
                    alert(data.message);
                }
            },
            error: function() {
                alert("shib")
            }
        })
    })
})