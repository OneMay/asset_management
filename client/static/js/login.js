$(function() {
    $('#login').click(function() {
        var employeeNo = $(".employeeNo").val();
        var password = $(".password").val();
        alert(employeeNo)
        $.ajax({
            url: '/api/user/login',
            type: 'post',
            dataType: 'json',
            data: {
                employeeNo: employeeNo,
                password: password
            },
            success: function() {
                alert("yes")
            },
            error: function() {
                alert("shib")
            }
        })
    })
})