<?php

require_once("classes/Mustache/Autoloader.php");
require_once("classes/String.php");
require_once("lib/helper.php");

unset($CFG);
global $CFG;
$CFG = new stdClass();
$CFG->debug = true;
$CFG->useJsKeyboard = true;

/*
 * YOU CAN MODIFY THESE PARAMETERS
 */

$CFG->wwwroot = 'https://patdev.glendon.yorku.ca/kiosk';
$CFG->courseCalendarHost = 'https://patdev.glendon.yorku.ca/moodle';
$CFG->courseCalendarToken = '75c5f9b982531664d5acd47141a3ac6f';
$CFG->faculty = 'GL';


/**
 * DO NOT MODIFY BELOW THIS LINE
 */
//Root folder
$CFG->rootFolder = dirname(__FILE__);

Mustache_Autoloader::register();
$mustache = new Mustache_Engine(array(
    'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/templates')
        ));

if (isset($_GET['lang'])) {
    $CFG->currentLanguage = $_GET['lang'];
} else {
    $CFG->currentLanguage = 'en';
}

//Debugging
if ($CFG->debug) {
    error_reporting(E_ALL);
    ini_set('display_errors', 'On');
}

//Set language name
if ($CFG->currentLanguage == 'fr') {
    $language = "English";
    $switchLangTo = 'en';
} else {
    $language = "Français";
    $switchLangTo = 'fr';
}

//Default Parameters
$CFG->defaultParams = [
    'wwwroot' => $CFG->wwwroot,
    'useJsKeyboard' => $CFG->useJsKeyboard,
    'lang' => $switchLangTo,
    'language' => $language,
    'self_serve_kiosk' => getString('self_serve_kiosk'),
    'slogan' => getString('slogan'),
    'academic_services' => getString('academic_services'),
    'academic_services_link' => $CFG->wwwroot . '/?lang=' . $CFG->currentLanguage,
    'academic_services_link_help' => getString('academic_services_link_help'),
    'faq' => getString('faq'),
    'faq_link' => $CFG->wwwroot . '/faq.php?lang=' . $CFG->currentLanguage,
    'faq_link_help' => getString('faq_link_help'),
    'finding_a_person' => getString('finding_a_person'),
    'finding_a_person_link' => $CFG->wwwroot . '/atlas.php?lang=' . $CFG->currentLanguage,
    'finding_a_person_link_help' => getString('finding_a_person_link_help'),
    'finding_course_room' => getString('finding_course_room'),
    'finding_course_room_link' => $CFG->wwwroot . '/course_calendar.php?lang=' . $CFG->currentLanguage,
    'finding_course_room_link_help' => getString('finding_course_room_link_help'),
    'finding_my_way' => getString('finding_my_way'),
    'finding_my_way_link' => $CFG->wwwroot . '/mapwize.php?lang=' . $CFG->currentLanguage,
    'finding_my_way_link_help' => getString('finding_my_way_link_help'),
    'it_help' => getString('it_help'),
    'it_help_link' => $CFG->wwwroot . '/technology_main.php?lang=' . $CFG->currentLanguage,
    'it_help_link_help' => getString('it_help_link_help'),
    'reserve_equipment' => getString('reserve_equipment'),
    'reserve_equipment_link' => $CFG->wwwroot . '/?lang=' . $CFG->currentLanguage,
    'reserve_equipment_link_help' => getString('reserve_equipment_link_help'),
    'special_events' => getString('special_events'),
    'special_events_link' => $CFG->wwwroot . '/events.php?lang=' . $CFG->currentLanguage,
    'special_events_link_help' => getString('special_events_link_help'),
];

$string = [];
