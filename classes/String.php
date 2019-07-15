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
        if (file_exists($CFG->rootFolder . '/lang/' . $lang . '/' . $file . '.json')) {
            $this->folder = $CFG->rootFolder . '/lang/' . $lang . '/' . $file . '.json';
        } else {
            $this->folder = $CFG->rootFolder . '/lang/en/' . $file . '.json';
        }
    }

    public function getString($name) {
        $string = json_decode(file_get_contents($this->folder));
        return $string->$name;
    }

}
