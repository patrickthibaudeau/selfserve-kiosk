<?php

require_once("classes/Mustache/Autoloader.php");
require_once("classes/String.php");
require_once("lib/helper.php");

global $CFG;

session_start();

Mustache_Autoloader::register();
$mustache = new Mustache_Engine(array(
    'loader' => new Mustache_Loader_FilesystemLoader($CFG->rootFolder . '/templates')
        ));
/**
 * Set current language
 */
if (isset($_GET['lang'])) {
    $CFG->currentLanguage = $_GET['lang'];
    $_SESSION['currentLanguage'] = $_GET['lang'];
} else {
    $CFG->currentLanguage = $CFG->defaultLanguage;
    $_SESSION['currentLanguage'] = $CFG->defaultLanguage;
}

/**
 * Set privacy mode
 * If this is a kiosk set to true, users will not have the option
 * to login. On other devices such as mobile devices, users can
 * login
 */
if ($_SESSION['public'] == false) {
    if (isset($_GET['public'])) {
        $CFG->public = true;
        $_SESSION['public'] = true;
    } else {
        $CFG->public = false;
        $_SESSION['public'] = false;
    }
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

if ($CFG->public) {
    $publicQueryString = '&public=1';
} else {
    $publicQueryString = '';
}

//Default Parameters
$CFG->defaultParams = [
    'wwwroot' => $CFG->wwwroot,
    'useJsKeyboard' => $CFG->useJsKeyboard,
    'logged_in' => getString('currently_logged_in'),
    'log_off' => getString('log_off'),
    'lang' => $switchLangTo,
    'language' => $language,
    'coming_soon' => getString('coming_soon'),
    'currentLanguage' => currentLanguage(),
    'self_serve_kiosk' => getString('self_serve_kiosk'),
    'slogan' => getString('slogan'),
    'academic_services' => getString('academic_services'),
    'academic_services_link' => $CFG->wwwroot . '/?lang=' . $CFG->currentLanguage . $publicQueryString,
    'academic_services_link_help' => getString('academic_services_link_help'),
    'academic_faq_link' => $CFG->wwwroot . '/academic_faq.php?lang=' . $CFG->currentLanguage . $publicQueryString,
    'academic_faq_link_help' => getString('academic_faq_link_help'),
    'faq' => getString('faq'),
    'faq_link' => $CFG->wwwroot . '/faq.php?lang=' . $CFG->currentLanguage . $publicQueryString,
    'faq_link_help' => getString('faq_link_help'),
    'finding_a_person' => getString('finding_a_person'),
    'finding_a_person_link' => $CFG->wwwroot . '/atlas.php?lang=' . $CFG->currentLanguage . $publicQueryString,
    'finding_a_person_link_help' => getString('finding_a_person_link_help'),
    'finding_classroom' => getString('finding_classroom'),
    'finding_classroom_link' => $CFG->wwwroot . '/course_calendar.php?lang=' . $CFG->currentLanguage . $publicQueryString,
    'finding_classroom_link_help' => getString('finding_classroom_link_help'),
    'finding_my_way' => getString('finding_my_way'),
    'finding_my_way_link' => $CFG->wwwroot . '/mapwize.php?lang=' . $CFG->currentLanguage . $publicQueryString,
    'finding_my_way_link_help' => getString('finding_my_way_link_help'),
    'it_help' => getString('it_help'),
    'it_help_link' => $CFG->wwwroot . '/technology_main.php?lang=' . $CFG->currentLanguage . $publicQueryString,
    'it_help_link_help' => getString('it_help_link_help'),
    'reserve_equipment' => getString('reserve_equipment'),
    'reserve_equipment_link' => $CFG->wwwroot . '/?lang=' . $CFG->currentLanguage,
    'reserve_equipment_link_help' => getString('reserve_equipment_link_help'),
    'special_events' => getString('special_events'),
    'special_events_link' => $CFG->wwwroot . '/events.php?lang=' . $CFG->currentLanguage . $publicQueryString,
    'special_events_link_help' => getString('special_events_link_help'),
    'public' => $_SESSION['public'],
    'faqHost' => $CFG->faqHost,
    'atlasHost' => $CFG->atlasHost,
    'atlasToken' => $CFG->atlasToken,
];

