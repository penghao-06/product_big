$(function () {
    $.ajaxSetup({
        async: true
    });
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        repass: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        },
    })
    $('[type="reset"]').on('click', function (e) {
        e.preventDefault()
        $('.layui-form')[0].reset()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (backData) {
                if (backData.status !== 0) return layer.msg(backData.message)
                layer.msg(backData.message)
                $('[type="reset"]').click()
                setTimeout(() => {
                    window.parent.document.getElementById('index_a').click()
                }, 300)
            }
        });
    })
})