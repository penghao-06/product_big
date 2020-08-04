const layer = layui.layer
const form = layui.form
let obj = null
$.ajaxSetup({
    async: false
});
function getUserinfoData() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function (backData) {
            if (backData.status !== 0) return layer.msg(backData.message)
            obj = backData.data
            form.val('lay-user-info', backData.data)
        }
    });
}