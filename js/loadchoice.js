layui.use('form', function () {
    var form = layui.form;
    form.on('select(type)', function (data) {
        console.log(data);
        var num = data.elem.selectedIndex; //获取对应option的索引排序
        console.log(num);
        $('#suboption').empty();
        switch (num) {
            case 1: //男
                {
                    $("#suboption").append(`<div class="selectSection">
        <div class="layui-form">
            <select name="class" lay-verify="required" id="competitionSelect">
                <option value="">请选择一个项目</option>
                <option value="01">100m</option>
                <option value="02">200m</option>
                <option value="03">400m</option>
                <option value="04">1000m</option>
                <option value="05">跳远</option>
                <option value="06">跳高</option>
                <option value="07">铅球</option>
                <option value="08">三级跳远</option>
            </select>
            <div class="layui-unselect  layui-form-select">
                <div class="layui-select-title ">
                    <input type="text" placeholder="请选择一个班级" value="" readonly="" class="layui-input layui-unselect">
                    <i class="layui-edge"></i>
                </div>
                <dl class="layui-anim layui-anim-upbit">
                    <dd lay-value="" class="layui-select-tips">请选择一个班级</dd>
                    <dd lay-value="01" class="">100m</dd>
                    <dd lay-value="02" class="">200m</dd>
                    <dd lay-value="03" class="">400m</dd>
                    <dd lay-value="04" class="">1000m</dd>
                    <dd lay-value="05" class="">跳远</dd>
                    <dd lay-value="06" class="">跳高</dd>
                    <dd lay-value="07" class="">铅球</dd>
                    <dd lay-value="08" class="">三级跳远</dd>
                </dl>
            </div>
        </div>
    </div>`);

                    layui.use('form', function () { //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
                    break;
                }
            case 2: //女

                {
                    console.log("enter2")
                    $("#suboption").append(`<div class="selectSection">
        <div class="layui-form">
            <select name="class" lay-verify="required" id="competitionSelect">
                <option value="">请选择一个项目</option>
                <option value="01">100m</option>
                <option value="02">200m</option>
                <option value="03">400m</option>
                <option value="04">800m</option>
                <option value="05">跳远</option>
                <option value="06">跳高</option>
                <option value="07">铅球</option>
                <option value="08">三级跳远</option>
            </select>
            <div class="layui-unselect  layui-form-select">
                <div class="layui-select-title ">
                    <input type="text" placeholder="请选择一个班级" value="" readonly="" class="layui-input layui-unselect">
                    <i class="layui-edge"></i>
                </div>
                <dl class="layui-anim layui-anim-upbit">
                    <dd lay-value="" class="layui-select-tips">请选择一个班级</dd>
                    <dd lay-value="01" class="">100m</dd>
                    <dd lay-value="02" class="">200m</dd>
                    <dd lay-value="03" class="">800m</dd>
                    <dd lay-value="04" class="">1000m</dd>
                    <dd lay-value="05" class="">跳远</dd>
                    <dd lay-value="06" class="">跳高</dd>
                    <dd lay-value="07" class="">铅球</dd>
                    <dd lay-value="08" class="">三级跳远</dd>
                </dl>
            </div>
        </div>
    </div>`);
                    layui.use('form', function () { //此段代码必不可少
                        var form = layui.form;
                        form.render();
                    });
                    break;

                }

            case 3: //班级
                $("#suboption").append(`<div class="selectSection">
        <div class="layui-form">
            <select name="class" lay-verify="required" id="competitionSelect">
                <option value="">请选择一个项目</option>
                <option value="01">４*100男子</option>
                <option value="02">4*100混合</option>
                <option value="03">拔河</option>
                <option value="04">跳大绳</option>
            </select>
            <div class="layui-unselect  layui-form-select">
                <div class="layui-select-title ">
                    <input type="text" placeholder="请选择一个班级" value="" readonly="" class="layui-input layui-unselect">
                    <i class="layui-edge"></i>
                </div>
                <dl class="layui-anim layui-anim-upbit">
                    <dd lay-value="" class="layui-select-tips">请选择一个班级</dd>
                    <dd lay-value="01" class="">4*100男子</dd>
                    <dd lay-value="02" class="">4*100混合</dd>
                    <dd lay-value="03" class="">拔河</dd>
                    <dd lay-value="04" class="">跳大绳</dd>
                </dl>
            </div>
        </div>
    </div>`);
                break;

            case 4: //评比
                $("#suboption").append(`<div class="selectSection">
        <div class="layui-form">
            <select name="class" lay-verify="required" id="competitionSelect">
                <option value="">请选择一个项目</option>
                <option value="01">精神文明</option>
                <option value="02">班级形象</option>
                <option value="03">项目总分</option>
            </select>
            <div class="layui-unselect  layui-form-select">
                <div class="layui-select-title ">
                    <input type="text" placeholder="请选择一个班级" value="" readonly="" class="layui-input layui-unselect">
                    <i class="layui-edge"></i>
                </div>
                <dl class="layui-anim layui-anim-upbit">
                    <dd lay-value="" class="layui-select-tips">请选择一个班级</dd>
                    <dd lay-value="01" class="">精神文明</dd>
                    <dd lay-value="02" class="">班级形象</dd>
                    <dd lay-value="03" class="">项目总分</dd>
                </dl>
            </div>
        </div>
    </div>`);
                break;
        }
    });
})