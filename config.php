<?php

unset($CFG);
global $CFG;
$CFG = new stdClass();
/*
 * YOU CAN MODIFY THESE PARAMETERS
 */

$CFG->wwwroot = 'https://patdev.glendon.yorku.ca/kiosk';
$CFG->debug = true;
$CFG->courseCalendarHost = 'https://patdev.glendon.yorku.ca/moodle';
$CFG->courseCalendarToken = '75c5f9b982531664d5acd47141a3ac6f';
$CFG->faculty = 'GL';
$CFG->defaultLanguage = 'en';
$CFG->useJsKeyboard = false;


/**
 * DO NOT MODIFY BELOW THIS LINE
 */
//Root folder
$CFG->rootFolder = dirname(__FILE__);
require("lib/autoload.php");


