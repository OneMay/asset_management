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
                if (data.code == 200 && data.userInfo.code > 50) {
                    window.location.href = '/Assetmsg';
                } else if (data.code == 200 && data.userInfo.code <= 50) {
                    window.location.href = '/employeeHome';
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