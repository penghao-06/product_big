$(function () {
    getUserinfoData()
    let $img = $('#image')
    $('#btn-file').click(function () {
        $('#file').click()
    })
    const options = {
        aspectRadio: 1,
        preview: '.img-preview',
        modal: false,
        guides: false,
    }
    $img.cropper(options)
    // 页面初始化
    function getUserAvatar() {
        //获得obj 讲obj 进行赋值
        $img.cropper('destroy').prop('src', obj.user_pic).cropper(options)
        obj = null
    }
    getUserAvatar()
    $('#file').on('change', function (e) {
        let file = e.target.files
        if (file.length === 0) return layer.msg('请选择文件')
        let fileList = file[0]
        let imageUrl = URL.createObjectURL(fileList)
        $img.cropper('destroy').prop('src', imageUrl).cropper(options)
    })
    $('.layui-btn-danger').on('click', function () {
        let imagBase = $img.cropper('getCroppedCanvas', {
            width: 100,
            height: 100,
        }).toDataURL('image/png')
        $.ajax({
            url: '/my/update/avatar',
            method: 'post',
            dataType: 'json',
            data: {
                avatar: imagBase
            },
            success: function (backData) {
                if (backData.status !== 0) return layer.msg(backData.message)
                layer.msg(backData.message)
                window.parent.getUserData()
            }
        });
    })
})