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

// 通过学号查询学生信息以及报名的项目信息
$data = array();
$school_id = $_GET['school_id'];
$name = $_GET['school_id'];
$stmt = $database->mysqli->prepare(
    'SELECT programs.name, student_program.grade, student_program.rank
    FROM `student_program`, `programs`
    WHERE student_program.student_id = (
        SELECT id FROM students
        WHERE school_id = ? OR name = ?
    ) AND student_program.program_id = programs.id'
);
$stmt->bind_param('ss', $school_id, $name);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_array(MYSQLI_ASSOC )) {
    $data[] = $row;
}

// 到此处后, 便将数据记录作为数组保存在了data
$stmt->close();
$database->mysqli->close();
echo ResponseJson($data);
