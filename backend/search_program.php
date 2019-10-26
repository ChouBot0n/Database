<?php
header('Content-type: application/json');
include '../backend/helpers.php';
include '../backend/MyDB.php';

// 实例化数据库查询媒介类
$database = new MyDB();
if (isset($database->errmsg)) {
    print_r(ResponseJson([], $database->errmsg));
    exit();
}

// 查询项目id
$data = array();
$program_type = $_GET['type'];
$program_name = $_GET['name'];
$stmt = $database->mysqli->prepare(
    'SELECT id
    FROM `programs`
    WHERE type = ? AND name = ?'
);
$stmt->bind_param('is', $program_type, $program_name);
$stmt->execute();
$stmt->bind_result($program_id);
$stmt->fetch();
$stmt->close();

switch ($program_type) {
    case 1:
    case 2:
        $stmt = $database->mysqli->prepare(
            "SELECT student_program.id, students.name as student_name, classes.year as class_year, classes.type as class_type, student_program.grade, student_program.rank
            FROM `students`, `classes`, `student_program`
            WHERE student_program.class_id = classes.id
                AND student_program.student_id = students.id
                AND student_program.program_id = {$program_id}
            ORDER BY student_program.rank"
        );
        break;
    case 3:
        $stmt = $database->mysqli->prepare(
            "SELECT class_program.id, classes.year as class_year, classes.type as class_type, class_program.grade, class_program.rank
            FROM `class_program`
            INNER JOIN `classes` ON classes.id = class_program.class_id
            WHERE class_program.program_id = {$program_id}
            ORDER BY class_program.rank"
        );
        break;
    case 4:
        $stmt = $database->mysqli->prepare(
            "SELECT class_compare.id, classes.year as class_year, classes.type as class_type, class_compare.grade, class_compare.rank, class_compare.detail
            FROM `class_compare`
            INNER JOIN `classes` ON classes.id = class_compare.class_id
            WHERE class_compare.program_id = {$program_id}
            ORDER BY class_compare.rank"
        );
        break;
    default:
        echo ResponseJson([], '参数有误');
        exit();
        break;
}
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $data[] = $row;
}
$stmt->close();

// 到此处后, 便将数据记录作为数组保存在了data
$database->mysqli->close();
echo ResponseJson($data);
