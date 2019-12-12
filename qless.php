<?php

require_once('config.php');


global $CFG;

$template = $mustache->loadTemplate('qless');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('qless');
$params['page'] = 'qless.php';

echo $template->render($params);
