<?php
	$page = $_SERVER['PHP_SELF'];
	require('check_permissions.php');

	$tabla = "tal_vehiculos";
	$orderby = "ORDER BY NUMERO ASC";
	
	include('get.php');
?>
