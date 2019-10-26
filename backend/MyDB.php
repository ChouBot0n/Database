<?php
include './config.php';


class MyDB
{
    public $mysqli; // 数据库操作媒介对象
    public $errmsg; // 错误信息
    function __construct() {
        $this->mysqli = new mysqli(DB_HOST, DB_USER, DB_PWD, DB_DB);
        if (mysqli_connect_errno()) {
            $this->errmsg = mysqli_connect_error();
        } else {
            mysqli_query($this->mysqli, "SET NAMES utf8");
        }
    }
}
