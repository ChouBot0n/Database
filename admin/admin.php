<?php
    session_start();
    $password = 'sc0hmqOI.W37I';
    $token = '1eaf1gea1gag1EFdwf6EG';
    if (crypt(trim(htmlentities($_POST['password'])), 'scutcssu') == $password) {
        setcookie('token',$token);
    } else {
        header("location:./login.html");
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <title>SCUT_CS 18th Sport Meet</title>
    <link rel="icon" href="../image/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="../image/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../layui/css/layui.css">
    <link rel="stylesheet" href="../css/admin.css">
    <!-- <code class="language-javascript">  </code>   -->
</head>

<body>
    <!-- begin 容器 -->
    <div class="container">
        <!-- begin 头部 -->
        <nav>
        </nav>
        <!-- end 头部 -->

        <!-- begin 主内容 -->
        <div class="main">
            <div class="layer-content">
                <div class="layui-form" id="searchProgramForm" lay-filter="searchProgramForm">
                    <div class="selectSection">
                        <select name="year" lay-verify="required" id="programTypeSelect" lay-filter="programTypeSelect">
                            <option value="">请选择项目类型</option>
                            <option value="1">男子项目</option>
                            <option value="2">女子项目</option>
                            <option value="3">班级项目</option>
                            <option value="4">班级评比</option>
                        </select>
                    </div>
                    <div class="selectSection">
                        <select name="type" lay-verify="required" id="programNameSelect" lay-filter="programNameSelect">
                            <option value="">请选择对应项目</option>
                        </select>
                    </div>
                </div>
                <div class="layer-main">
                    <table class="layui-table">
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>班级</th>
                                <th width="200">成绩</th>
                                <th>排名</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="studentTableBody">
                        </tbody>
                    </table>
                </div>
                <div class="layer-main">
                    <table class="layui-table">
                        <thead>
                            <tr>
                                <th>班级</th>
                                <th width="200">成绩</th>
                                <th>排名</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="classTableBody">
                        </tbody>
                    </table>
                </div>
                <div class="layer-main">
                    <table class="layui-table">
                        <thead>
                            <tr>
                                <th>班级</th>
                                <th width="200">细节</th>
                                <th width="200">成绩</th>
                                <th>排名</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="compareTableBody">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- end 主内容 -->

        <!-- 调整底部 -->
        <div class="push"></div>
    </div>
    <!-- end 容器 -->


    <!-- begin 底部 -->
    <div class="footer-description">
        <img src="../image/text.jpg" alt="底部文字" class="footer-text">
    </div>
    <footer>
    </footer>
    <!-- end 底部 -->
    <script src="../js/jQuery-v3.2.1.js"></script>
    <script src="../layui/layui.js"></script>
    <script src="../js/admin.js"></script>
    <script src="../js/json2.js"></script>
</body>

</html>