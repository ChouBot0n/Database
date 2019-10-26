layui.use(['element', 'layer', 'table', 'form'], function () {
    var element = layui.element
    var layer = layui.layer
    var table = layui.table
    var form = layui.form

    // 动态改变班级选择框
    var programs = {
        '1': {
            '男子100米': 1,
            '男子200米': 2,
            '男子400米': 3,
            '男子1000米': 4,
            '男子跳远': 5,
            '男子跳高': 6,
            '男子铅球': 7,
            '男子三级跳远': 8
        },
        '2': {
            '女子100米': 9,
            '女子200米': 10,
            '女子400米': 11,
            '女子800米': 12,
            '女子跳远': 13,
            '女子跳高': 14,
            '女子铅球': 15
        },
        '3': {
            '4x100接力': 16,
            '4x100混合': 17,
            '拔河': 18,
            '跳大绳': 19,
            '平板支撑': 20,
            '迎面接力': 24
        },
        '4': {
            '精神文明': 21,
            '班级形象': 22,
            '项目总分': 23
        }
    }
    form.on('select(programTypeSelect)', function (data) {
        var html = '<option value="">请选择对应项目</option>'
        var program_names = programs[data.value]
        for (var name in program_names) {
            html += `<option value="${name}">${name}</option>`
        }
        $('#programNameSelect').html(html);
        form.render('select', 'searchProgramForm');

        $('#studentTableBody').empty()
        $('#classTableBody').empty()
        $('#compareTableBody').empty()
    })

    // 获取项目数据
    var classes = {
        '1': '计科1',
        '2': '计科2',
        '3': '计创',
        '4': '计联',
        '5': '网工',
        '6': '信安',
        '7': '计创1',
        '8': '计创2'
    }
    form.on('select(programNameSelect)', function (data) {
        var type = $('#programTypeSelect').val()
        var name = data.value
        console.log(data)
        if (type == '' || name == '') {
            return
        }

        $.ajax({
            type: 'GET',
            url: '../backend/search_program.php',
            data: {
                'type': type,
                'name': name
            },
            success: function (data) {
                if (data.errcode != 0) {
                    layer.msg(data.errmsg, { icon: 5 })
                    return
                }
                var dataArray = data.data
                $('#studentTableBody').empty()
                $('#classTableBody').empty()
                $('#compareTableBody').empty()

                switch(type) {
                case '1':
                case '2':
                    var html = ''
                    $(dataArray).each(function (i, el) {
                        html +=
                            `<tr>\
                                <td>${el.student_name}</td>\
                                <td>${el.class_year}${classes[el.class_type]}</td>\
                                <td><input class="layui-input input-data-id" value="${el.grade}" data-id="${el.id}" /></td>\
                                <td>${el.rank}</td>\
                                <td><button class="layui-btn">保存</button></td>\
                            </tr>`

                    })
                    $('#studentTableBody').html(html)
                    break
                case '3':
                    var html = ''
                    $(dataArray).each(function (i, el) {
                        html +=
                            `<tr>\
                                <td>${el.class_year}${classes[el.class_type]}</td>\
                                <td><input class="layui-input input-data-id" value="${el.grade}" data-id="${el.id}" /></td>\
                                <td>${el.rank}</td>\
                                <td><button class="layui-btn">保存</button></td>\
                            </tr>`

                    })
                    $('#classTableBody').html(html)
                    break
                case '4':
                    var html = ''
                    $(dataArray).each(function (i, el) {
                        var detail_object = JSON.parse(el.detail)
                        var html_detail = ''
                        for (var key in detail_object) {
                            html_detail +=
                                `${key}: <input class="layui-input input-compare-detail" value="${detail_object[key]}" data-key="${key}" />`
                        }
                        html +=
                            `<tr>\
                                <td>${el.class_year}${classes[el.class_type]}</td>\
                                <td>${html_detail}</td>\
                                <td><input class="layui-input input-data-id" value="${el.grade}" data-id="${el.id}" /></td>\
                                <td>${el.rank}</td>\
                                <td><button class="layui-btn">保存</button></td>\
                            </tr>`

                    })
                    $('#compareTableBody').html(html)
                    break
                default:
                    break
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.msg('连接错误', { icon: 5 })
            }
        })
    })
})

$('#studentTableBody, #classTableBody').on('click', 'button', function() {
    var id = $(this).parent().parent().find('input').data('id')
    var grade = $(this).parent().parent().find('input').val()
    $.ajax({
        type: 'POST',
        url: '../backend/update_grade.php',
        data: {
            'id': id,
            'type': $('#programTypeSelect').val(),
            'grade': grade,
            'token': getCookie('token')
        },
        success: function (data) {
            if (data.errcode == 0) {
                layer.msg('更新成功', { icon: 1, time: 1000 })
            } else {
                layer.msg(data.errmsg, { icon: 5 })
            }
            $('#programNameSelect').next().find('.layui-this').click();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('连接错误', { icon: 5 })
        }
    })
})

$('#compareTableBody').on('click', 'button', function() {
    var id = $(this).parent().parent().find('input.input-data-id').data('id')
    var grade = $(this).parent().parent().find('input.input-data-id').val()
    var detail_object = {}
    $(this).parent().parent().find('.input-compare-detail').each(function(index, el) {
        $key = $(el).data('key')
        detail_object[$key] = $(el).val()
    });
    var detail = JSON.stringify(detail_object)
    $.ajax({
        type: 'POST',
        url: '../backend/update_grade.php',
        data: {
            'id': id,
            'type': $('#programTypeSelect').val(),
            'grade': grade,
            'detail': detail,
            'token': getCookie('token')
        },
        success: function (data) {
            if (data.errcode == 0) {
                layer.msg('更新成功', { icon: 1, time: 1000 })
            } else {
                layer.msg(data.errmsg, { icon: 5 })
            }
            $('#programNameSelect').next().find('.layui-this').click();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('连接错误', { icon: 5 })
        }
    })
})

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
