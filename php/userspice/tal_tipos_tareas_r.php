<?php
	$page = $_SERVER['PHP_SELF'];
	require('check_permissions.php');

	$tabla = "tal_tipos_tareas";
	$orderby = "ORDER BY TIPO ASC, NOMBRE ASC";
	
	include('get.php');
?>
