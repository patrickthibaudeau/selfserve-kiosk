<?php

require_once('config.php');
$action = $_GET['action'];

switch ($action) {
    case 'getFaq':
        $id = $_GET['recordid'];
        $lang = $_GET['lang'];
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://patdev.glendon.yorku.ca/faq/api.php?action=login',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS => "faqusername=webservice&faqpassword=asdasd",
            CURLOPT_HEADER => 1,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        // get cookie
        preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $response, $matches);
        $cookies = array();
        foreach ($matches[1] as $item) {
            parse_str($item, $cookie);
            $cookies = array_merge($cookies, $cookie);
        }

        $cookie = $cookies['PHPSESSID'];

        $getFaq = curl_init();
        curl_setopt_array($getFaq, array(
            CURLOPT_URL => 'https://patdev.glendon.yorku.ca/faq/api.php?action=getFaq' .
            '&lang=' . $lang . '&recordid=' . $id,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => array("PHPSESSID" => $cookie),
        ));

        $response = curl_exec($getFaq);
        curl_close($getFaq);
        echo $response;
        break;       
}

