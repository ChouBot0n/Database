<?php
header('Content-type: application/json');
include './helpers.php';
include './MyDB.php';

// 实例化数据库查询媒介类
$database = new MyDB();
if (isset($database->errmsg)) {
    print_r(ResponseJson([], $database->errmsg));
    exit();
}

// 验证
if (!isset($_POST['token'])) {
    $_POST['token'] = '';
}
if (trim(htmlentities($_POST['token'])) != '1eaf1gea1gag1EFdwf6EG') {
    print_r(ResponseJson([], '验证失败'));
    exit();
}

// 更新成绩
$data = array();
$id = $_POST['id'];
$type = $_POST['type'];
$grade = $_POST['grade'];
switch ($type) {
    case 1:
    case 2:
        $database_name = 'student_program';
        break;
    case 3:
        $database_name = 'class_program';
        break;
    case 4:
        $database_name = 'class_compare';
        break;
    default:
        echo ResponseJson([], '参数有误');
        exit();
        break;
}
$stmt = $database->mysqli->prepare(
    "UPDATE {$database_name}
    SET grade = ?
    WHERE id = ?"
);
$stmt->bind_param('si', $grade, $id);
$stmt->execute();
$stmt->close();

if (isset($_POST['detail'])) {
    $stmt = $database->mysqli->prepare(
        "UPDATE {$database_name}
        SET detail = ?
        WHERE id = ?"
    );
    $stmt->bind_param('si', $_POST['detail'], $id);
    $stmt->execute();
    $stmt->close();
}

// 获取项目id
$data = array();
$stmt = $database->mysqli->prepare(
    "SELECT program_id
    FROM {$database_name}
    WHERE id = {$id}"
);
$stmt->execute();
$stmt->bind_result($program_id);
$stmt->fetch();
$stmt->close();

// 获取成绩排序类型
$data = array();
$stmt = $database->mysqli->prepare(
    "SELECT order_rule
    FROM programs
    WHERE id = {$program_id}"
);
$stmt->execute();
$stmt->bind_result($order_rule);
$stmt->fetch();
$stmt->close();

// 更新排名
switch ($order_rule) {
    case 1:
        $order_sql = " ORDER BY CASE WHEN grade = '无' THEN 0 END, grade";
        break;
    case 2:
        $order_sql = " ORDER BY CASE WHEN grade = '无' THEN 0 END, grade desc";
        break;
    case 3:
        // $order_sql = " ORDER BY CASE WHEN grade = '无' THEN 0 END, CAST(grade AS DECIMAL)";
        $order_sql = " ORDER BY CASE WHEN grade = '无' THEN 0 END, grade";
        break;
    case 4:
        // $order_sql = " ORDER BY CASE WHEN grade = '无' THEN 0 END, CAST(grade AS DECIMAL) desc";
        $order_sql = " ORDER BY CASE WHEN grade = '无' THEN 0 END, grade desc";
        break;
    default:
        $order_sql = " ORDER BY CASE WHEN grade = '无' THEN 0 END, grade";
        break;
}
mysqli_query($database->mysqli, "SET @rank = 0, @index = 0, @last_grade = ''");
$stmt = $database->mysqli->prepare(
    "UPDATE {$database_name}
    SET rank = @rank := IF(@last_grade = grade, @rank, @index := @index + 1), grade = @last_grade := grade
    WHERE program_id = {$program_id}" . $order_sql
);
$stmt->execute();
$stmt->close();

$database->mysqli->close();
echo ResponseJson([], '', '更新成功');
