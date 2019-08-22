<?php

require_once('config.php');

global $CFG;

$url = "$CFG->courseCalendarHost/webservice/rest/server.php?wstoken=$CFG->courseCalendarToken&wsfunction=kioskws_timetable&faculty=$CFG->faculty&moodlewsrestformat=json";

$calendar = json_decode(file_get_contents($url));
if ($calendar) {
    $courses = $calendar;
} else {
    $courses = '';
}
$template = $mustache->loadTemplate('course_calendar');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('course_calendar');
$params['page'] = 'course_calendar.php';
$params['courses_for'] = getString('courses_for');
$params['course_name'] = getString('course_name');
$params['hour_symbol'] = getString('hour_symbol');
$params['room'] = getString('room');
$params['start_time'] = getString('start_time');
$params['taught_by'] = getString('taught_by');
$params['courses'] = $courses;

echo $template->render($params);
