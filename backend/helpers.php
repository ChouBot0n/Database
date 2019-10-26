<?php
if (!function_exists('ResponseJson')) {
    /**
     * 返回json数据
     *
     * @param  array  $data  返回数据
     * @param  string  $errmsg  返回的错误信息
     * @param  string  $hintmsg  返回的提示信息，一般不需要
     * @return json  errcode：0失败，1成功
     */
    function ResponseJson($data = [], $errmsg = '', $hintmsg = '')
    {
        return json_encode([
            'data'  => $data,
            'errcode'  => $errmsg == '' ? 0 : 1,
            'errmsg' => $errmsg,
            'hintmsg' => $hintmsg
        ]);
    }
}
