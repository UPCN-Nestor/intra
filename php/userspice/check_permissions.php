<?php

require_once 'cors.php';
require_once 'users/init.php';

if (!securePage($page)){ 
	//header("Location: $loc");
	//die();
	die("no autenticado");
}

?>