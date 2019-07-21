<?php

require_once('config.php');


global $CFG;

$popularSearches = json_decode(file_get_contents('https://ithelp.glendon.yorku.ca/faq/api.php?action=getPopular&lang=' . $CFG->currentLanguage));
//print_object($popularSearches);
$popular = [];
$i = 0;
foreach ($popularSearches as $p) {
    $query = parse_url($p->url, PHP_URL_QUERY);
    parse_str($query, $params);
    $popular[$i]['question'] = $p->question;
    $popular[$i]['id'] = $params['id'];
    $popular[$i]['lang'] = $params['artlang'];
    $i++;
}

$template = $mustache->loadTemplate('faq');
$params = $CFG->defaultParams;
$params['pageTitle'] = getString('faq');
$params['faq'] = getString('faq');
$params['popular_searches'] = getString('popular_searches');
$params['page'] = 'faq.php';
$params['submit'] = getString('submit');
$params['reset'] = getString('reset');
$params['popular'] = $popular;

echo $template->render($params);
