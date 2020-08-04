$(function () {
    //点击事件的切换效果
    $('#register').on('click', function () {
        $('#loginBox').hide()
        $('.login-register').show()
    })
    $('#login-btn').on('click', function () {
        $('#loginBox').show()
        $('.login-register').hide()
    })
    const form = layui.form
    const layer = layui.layer
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            if (value !== $('input[name="respassword"]').val()) return layer.msg('两次密码输入的不正确')
        }
    });
    $('#login-register').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            method: 'post',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (backData) {
                if (backData.status !== 0) return layer.msg(backData.message)
                layer.msg(backData.message)
                $(this)[0].reset()
                //手动调用click事件
                $('#login-btn').click()
            }.bind(this)
        });
    });
    $('#login-box-item').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (backData) {
                console.log(backData);
                if (backData.status !== 0) return layer.msg(backData.message)
                localStorage.setItem('token', backData.token)
                location.href = '/index.html'
            }
        });
    })
})