<?php

require_once('config.php');


global $CFG;


$template = $mustache->loadTemplate('mapwize');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('finding_my_way');

echo $template->render($params);
