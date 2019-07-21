<?php

require_once('config.php');


global $CFG;

$template = $mustache->loadTemplate('atlas');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('atlas');
$params['find_a_person'] = getString('find_a_person');
$params['page'] = 'atlas.php';
$params['first_name'] = getString('first_name');
$params['last_name'] = getString('last_name');
$params['submit'] = getString('submit');

echo $template->render($params);
