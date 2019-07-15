<?php

require_once("classes/Mustache/Autoloader.php");
require_once("classes/String.php");
require_once("lib/helper.php");

unset($CFG);
global $CFG;
$CFG = new stdClass();
$CFG->debug = true;

/*
 * YOU CAN MODIFY THESE PARAMETERS
 */

$CFG->wwwroot = 'http://localhost/kiosk';

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
    'lang' => $switchLangTo,
    'language' => $language,
    'self_serve_kiosk' => getString('self_serve_kiosk'),
    'slogan' => getString('slogan'),
];

$string = [];