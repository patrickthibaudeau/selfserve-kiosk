<?php

require_once('config.php');


global $CFG;

$template = $mustache->loadTemplate('main');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('main_page_title');
$params['academic_services'] = getString('academic_services');
$params['academic_services_link'] = $CFG->wwwroot . '/';
$params['academic_services_link_help'] = getString('academic_services_link_help');
$params['finding_a_person'] = getString('finding_a_person');
$params['finding_a_person_link'] = $CFG->wwwroot . '/';
$params['finding_a_person_link_help'] = getString('finding_a_person_link_help');
$params['finding_my_way'] = getString('finding_my_way');
$params['finding_my_way_link'] = $CFG->wwwroot . '/';
$params['finding_my_way_link_help'] = getString('finding_my_way_link_help');
$params['it_help'] = getString('it_help');
$params['it_help_link'] = $CFG->wwwroot . '/';
$params['it_help_link_help'] = getString('it_help_link_help');
$params['page'] = 'index.php';

echo $template->render($params);
