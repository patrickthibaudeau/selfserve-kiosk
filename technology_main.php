<?php

require_once('config.php');


global $CFG;

$template = $mustache->loadTemplate('technology_main');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('technology');
$params['page'] = 'technology_main.php';

echo $template->render($params);
