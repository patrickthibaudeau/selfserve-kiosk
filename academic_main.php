<?php

require_once('config.php');


global $CFG;

$template = $mustache->loadTemplate('academic_main');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('academic_services');
$params['page'] = 'academic_main.php';

echo $template->render($params);
