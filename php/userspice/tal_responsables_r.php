<?php
	$page = $_SERVER['PHP_SELF'];
	require('check_permissions.php');

	$tabla = "tal_responsables";
	$orderby = "ORDER BY LEGAJO ASC";
	
	include('get.php');
?>
