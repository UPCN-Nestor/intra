<?php
	$page = $_SERVER['PHP_SELF'];
	require('check_permissions.php');

	$tabla = "tal_proveedores";
	$orderby = "ORDER BY NOMBRE ASC";
	
	include('get.php');
?>
