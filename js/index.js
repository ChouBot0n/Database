// 动态项目选择
var type_comp = {
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
        '迎面接力': 24
    },
    '4': {
        '精神文明': 21,
        '班级形象': 22,
        '项目总分': 23
    }
}
layui.use(['element', 'layer', 'table', 'form'], function () {
    var element = layui.element
    var layer = layui.layer
    var table = layui.table
    var form = layui.form

    // 动态改变班级选择框
    var year_classes = {
        '16': {
            '计科1': 1,
            '计科2': 2,
            '计创': 3,
            '计联': 4,
            '网工': 5,
            '信安': 6
        },
        '17': {
            '计科1': 1,
            '计科2': 2,
            '计创': 3,
            '计联': 4,
            '网工': 5,
            '信安': 6
        },
        '18': {
            '计科1': 1,
            '计科2': 2,
            '计创1': 7,
            '计创2': 8,
            '计联': 4,
            '网工': 5,
            '信安': 6
        }
    }
    form.on('select(yearSelect)', function (data) {
        $('#stuTableBody').empty()
        $('#clsTableBody').empty()
        $('#cmpTableBody').empty()
        var html = '<option value="">请选择一个班级</option>'
        var classes = year_classes[data.value]
        for (var name in classes) {
            html += `<option value="${classes[name]}">${name}</option>`
        }
        $('#classSelect').html(html);
        form.render('select', 'searchClassForm');
    })
    form.on('select(classSelect)', function (data) {
        $('#stuTableBody').empty()
        $('#clsTableBody').empty()
        $('#cmpTableBody').empty()
        var year = $('#yearSelect').val()
        var type = data.value
        if (year == '' || type == '') {
            return
        }
        SearchClass();
    })



    form.on('select(typeSelect)', function (data) {
        $('#classTableBody').empty()
        var html = '<option value="">请选择一个类别</option>'
        var comps = type_comp[data.value]
        for (var competition in comps) {
            html += `<option value="${competition}">${competition}</option>`
        }
        $('#compSelect').html(html);
        if (data.value == 1 || data.value == 2)
            var html = ``
                + '<th width="50">姓名</th>'
                + '<th>班级</th>'
                + '<th>成绩</th>'
                + '<th>排名</th>'
        if (data.value == 3)
            var html = ``
                + '<th>班级</th>'
                + '<th>成绩</th>'
                + '<th>排名</th>'
        if (data.value == 4)
            var html = ``
                + '<th>班级</th>'
                + '<th>成绩</th>'
                + '<th>排名</th>'
                + `<th width="300">细节</th>`
        $('#tableChange').html(html);

        form.render('select', 'searchTypeForm');
        $('#compTableBody').empty()
        table.render('tr', 'dynatictable');
    })
    form.on('select(compSelect)', function (data) {
        $('#compTableBody').empty()
        var type = $('#typeSelect').val()
        var name = data.value
        if (type == '' || name == '') {
            return
        }
        searchComp();
    })
})

$(document).ready(function () {
    // 当学生查询输入框变化时，清空上次查询结果
    $("#studentInput").bind('input propertychange', function () {
        $('#studentTableBody').empty()
    })
})

// 初始化学生查询弹出层
function InitStudentLayer() {
    layer.open({
        type: 1,
        closeBtn: 1,
        title: false,
        shadeClose: true,
        shade: 0.5,
        area: ['300px', '500px'],
        skin: 'search-layer',
        content: $('#studentLayer')
    })
}

function InitClassLayer() {
    layer.open({
        type: 1,
        closeBtn: 1,
        title: false,
        shadeClose: true,
        shade: 0.5,
        area: ['300px', '500px'],
        skin: 'search-layer',
        content: $('#classLayer')
    })
}

function InitCompetitionLayer() {
    layer.open({
        type: 1,
        closeBtn: 1,
        title: false,
        shadeClose: true,
        shade: 0.5,
        area: ['300px', '500px'],
        skin: 'search-layer',
        content: $('#competitonLayer')
    })
}
// 学生查询
function SearchStudent() {
    var school_id = $('#studentInput').val()
    $.ajax({
        type: 'GET',
        url: '../backend/search_student.php',
        data: {

            // 'info': info
            'school_id': school_id
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

            if (dataArray.length == 0) {
                layer.msg('未找到该学生信息', { icon: 5 })
                return
            }

            console.log(dataArray)
            var html = ''
            $(dataArray).each(function (i, el) {
                html +=
                    `<tr>\
                        <td>${el.name}</td>\
                        <td>${el.grade}</td>\
                        <td>${el.rank}</td>\
                    </tr>`

            })
            $('#studentTableBody').html(html);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('连接错误', { icon: 5 })
        }
    })
}

// 班级查询
function SearchClass() {
    var year = $('#yearSelect').val();
    var type = $('#classSelect').val();
    $.ajax({
        type: 'GET',
        url: '../backend/search_class.php',
        data: {
            'year': year,
            'type': type
        },
        success: function (data) {
            if (data.errcode != 0) {
                layer.msg(data.errmsg, { icon: 5 })
                return
            }
            var dataArray = data.data

            if (dataArray.length == 0) {
                layer.msg('未找到该班级信息', { icon: 5 })
                return
            }

            console.log(dataArray)
            var html1 = ''
            $(dataArray['student']).each(function (i, el) {
                if (el.program.length == 2) {
                    html1 +=
                    `<tr>\
                        <td>${el.student_name}</td>\
                        <td>${el.program['0']['program_name']}</td>\
                        <td>${el.program['0']['grade']}</td>\
                        <td>${el.program['0']['rank']}</td>\
                    </tr>\
                        <tr>\
                        <td>\
                        </td>\
                        <td>${el.program['1']['program_name']}</td>\
                        <td>${el.program['1']['grade']}</td>\
                        <td>${el.program['1']['rank']}</td>\
                    </tr>`}

                else{
                    html1 +=
                    `<tr>\
                        <td>${el.student_name}</td>\
                        <td>${el.program['0']['program_name']}</td>\
                        <td>${el.program['0']['grade']}</td>\
                        <td>${el.program['0']['rank']}</td>\
                    </tr>`
                }

            })
            $('#stuTableBody').html(html1);

            var html2 = ''
            $(dataArray['program']).each(function (i, el) {
                html2 +=
                    `<tr>\
                        <td>${el.program_name}</td>\
                        <td>${el.grade}</td>\
                        <td>${el.rank}</td>\
                    </tr>`

            })
            $('#clsTableBody').html(html2);

            var html3 = ''
            $(dataArray['compare']).each(function (i, el) {
                var detail_object = JSON.parse(el.detail)
                var html_detail = ''
                for (var key in detail_object) {
                    html_detail +=
                        `<p>${key}: ${detail_object[key]}</p>`
                }
                html3 +=
                    `<tr>\
                        <td>${el.program_name}</td>\
                        <td>${el.grade}</td>\
                        <td>${el.rank}</td>\
                        <td>${html_detail}</td>\
                    </tr>`
            })
            $('#cmpTableBody').html(html3);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('连接错误', { icon: 5 })
        }
    })
}

function searchComp() {
    var type = $('#typeSelect').val()
    var name = $('#compSelect').val()
    if (type == '' || name == '') {
        return
    }
    console.log(name)
    $.ajax({
        type: 'GET',
        url: '../backend/search_comp.php',
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

            console.log(dataArray)
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
            switch (type) {
                case '1':
                case '2':
                    var html = ''
                    $(dataArray).each(function (i, el) {
                        html +=
                            `<tr>\
                                <td>${el.student_name}</td>\
                                <td>${el.class_year}${classes[el.class_type]}</td>\
                                <td>${el.grade}</td>\
                                <td>${el.rank}</td>\
                            </tr>`

                    })
                    $('#compTableBody').html(html)
                    break
                case '3':
                    var html = ''
                    $(dataArray).each(function (i, el) {
                        html +=
                            `<tr>\
                                <td>${el.class_year}${classes[el.class_type]}</td>\
                                <td>${el.grade}</td>\
                                <td>${el.rank}</td>\
                            </tr>`

                    })
                    $('#compTableBody').html(html)
                    break
                case '4':
                    var html = ''
                    $(dataArray).each(function (i, el) {
                        var detail_object = JSON.parse(el.detail)
                        var html_detail = ''
                        for (var key in detail_object) {
                            html_detail +=
                                `<p>${key}: ${detail_object[key]}</p>`
                        }
                        html +=
                            `<tr>\
                                <td>${el.class_year}${classes[el.class_type]}</td>\
                                <td>${el.grade}</td>\
                                <td>${el.rank}</td>\
                                <td>${html_detail}</td>\
                            </tr>`

                    })
                    $('#compTableBody').html(html)
                    break
                default:
                    break
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg('连接错误', { icon: 5 })
        }
    })
}
// 平移弹出层内的输入框，以修复安卓下输入框消失的bug
function OnfocusLayerInput(input) {
    $(input).parent().parent().animate({ 'top': '+=120px' }, 300)
}

function OnBlurLayerInput(input) {
    $(input).parent().parent().animate({ 'top': '-=120px' }, 300)
}

