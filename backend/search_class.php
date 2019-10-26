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

// 查询班级id
$data = array();
$class_year = $_GET['year'];
$class_type = $_GET['type'];
$stmt = $database->mysqli->prepare(
    'SELECT id
    FROM `classes`
    WHERE year = ? AND type = ?'
);
$stmt->bind_param('ii', $class_year, $class_type);
$stmt->execute();
$stmt->bind_result($class_id);
$stmt->fetch();
$stmt->close();

// 获取该班级的学生项目成绩
$stmt = $database->mysqli->prepare(
    "SELECT students.name as student_name, programs.name as program_name, student_program.grade, student_program.rank
    FROM `students`, `programs`, `student_program`
    WHERE student_program.class_id = {$class_id}
        AND student_program.student_id = students.id
        AND student_program.program_id = programs.id"
);
$stmt->execute();
$result = $stmt->get_result();
$student_data = [];
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    if (!isset($student_data[$row['student_name']])) {
        $student_data[$row['student_name']] = [
            'student_name' => $row['student_name'],
            'program' => []
        ];
    }
    $student_data[$row['student_name']]['program'][] = [
        'program_name' => $row['program_name'],
        'grade' => $row['grade'],
        'rank' => $row['rank'],
    ];
}
$data['student'] = array_values($student_data);
$stmt->close();

// 获取该班级的班级项目
$stmt = $database->mysqli->prepare(
    "SELECT programs.name as program_name, class_program.grade, class_program.rank
    FROM `programs`, `class_program`
    WHERE class_program.class_id = {$class_id}
        AND class_program.program_id = programs.id"
);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $data['program'][] = $row;
}
$stmt->close();

// 获取该班级的评比项目
$stmt = $database->mysqli->prepare(
    "SELECT programs.name as program_name, class_compare.grade, class_compare.rank, class_compare.detail
    FROM `programs`, `class_compare`
    WHERE class_compare.class_id = {$class_id}
        AND class_compare.program_id = programs.id"
);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $data['compare'][] = $row;
}
$stmt->close();

$database->mysqli->close();
echo ResponseJson($data);
