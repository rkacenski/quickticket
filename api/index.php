<?php
/* 
Ryan Framework v1.0
Da framwrok For APIs and shit
*/
ini_set("display_errors", "On");
error_reporting(-1);


session_start();

include 'core/route.php';
include 'core/help.php';
//include 'core/curl.php';
include 'core/db.php';
include 'core/validate.php';


$route = new Route();


$route->add('/', 'Home');

$route->add('user', 'User');

$route->add('tickets', 'Tickets');

$route->run();

?>