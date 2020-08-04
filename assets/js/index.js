$(function () {
    // 退出事件
    $('#tuichu').on('click', function () {
        layer.confirm('确认退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);

        });
        return false
    })

    getUserData()
})
//获取用户的全部信息
function getUserData() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function (backData) {
            if (backData.status !== 0) return layer.msg(backData.message)
            let name = backData.data.nickname || backData.data.username
            $('.header-text').html(`欢迎 &nbsp; &nbsp; ${name}`)
            if (backData.data.user_pic === null) {
                $('.layui-nav-img').hide()
                $('.header-img').text(name[0].toUpperCase()).show()
            } else {
                $('.header-img').hide()
                $('.layui-nav-img').prop('src', backData.data.user_pic).show()
            }
        }
    });
}