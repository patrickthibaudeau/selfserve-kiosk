<?php

namespace kiosk;

/**
 * Description of String
 *
 * @author patrick
 */
class LanguageStrings {

    private $folder;

    public function __construct($lang = 'en', $file = 'kiosk') {
        global $CFG;
        if (file_exists($CFG->rootFolder . '/lang/' . $lang . '/' . $file . '.php')) {
            $this->folder = $CFG->rootFolder . '/lang/' . $lang . '/' . $file . '.php';
        } else {
            $this->folder = $CFG->rootFolder . '/lang/en/' . $file . '.php';
        }
    }

    public function getString($name) {
        $string = [];
        include($this->folder);
        return $string["$name"];
    }

}
