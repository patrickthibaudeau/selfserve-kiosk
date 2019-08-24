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
$CFG->atlasHost = 'https://admin.glendon.yorku.ca';
$CFG->atlasToken = 'c6edf616d1c5ecc323172c813c21d990';
$CFG->faqHost = 'https://ithelp.glendon.yorku.ca/faq';
$CFG->faqToken = '';
$CFG->faculty = 'GL';
$CFG->defaultLanguage = 'en';
$CFG->useJsKeyboard = false;


/**
 * DO NOT MODIFY BELOW THIS LINE
 */
//Root folder
$CFG->rootFolder = dirname(__FILE__);
require("lib/autoload.php");


