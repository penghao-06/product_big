$(function () {
    $.ajaxPrefilter(function (options) {
        options.complete = function (res) {

            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
        // url ajaxprefilter 路径
        // url 判断是不是my添加headers请求头
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token')
            }
        }

    })
})