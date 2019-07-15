<?php

require_once('config.php');

/**
 * 
 * @param string Name of string being looked for
 * @param string $file File which strings are found. Default kiosk
 */
function getString($name, $file = 'kiosk') {
    global $CFG;
    // Load strings
    $STRING = new kiosk\LanguageStrings($CFG->currentLanguage);
    return $STRING->getString($name, $file);
}

/**
 * 
 * @param object $object
 */
function print_object($object) {
    echo '<pre>';
    print_r($object);
    echo '</pre>';
}
