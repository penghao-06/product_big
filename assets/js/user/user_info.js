$(function () {
    getUserinfoData()
    $('[ type="reset"]').click(function (e) {
        e.preventDefault()
        form.val('lay-user-info', obj)
        obj = null

    })
    // 修改用户数据
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'post',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (backData) {
                if (backData.status !== 0) return layer.msg(backData.message)
                layer.msg(backData.message)
                window.parent.getUserData()
            }
        });
    })
})