<?php
	$page = $_SERVER['PHP_SELF'];
	require('check_permissions.php');

	$tabla = "tal_tareas";
	
	$filters = json_decode($_GET["filters"], true);	  
		
	include('abm.php');
?>
