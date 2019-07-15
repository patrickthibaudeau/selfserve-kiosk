<?php

require_once('config.php');


global $CFG;

$template = $mustache->loadTemplate('main');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('main_page_title');
$params['page'] = 'index.php';

echo $template->render($params);
