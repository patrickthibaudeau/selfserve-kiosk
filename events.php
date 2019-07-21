<?php

require_once('config.php');


global $CFG;


$template = $mustache->loadTemplate('events');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('special_events');

echo $template->render($params);
