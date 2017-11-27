<?php
	$page = $_SERVER['PHP_SELF'];
	require('check_permissions.php');

	$tabla = "tal_tareas";
	
	$filters = json_decode($_GET["filters"], true);	  
	
	$where = 'WHERE';
	foreach($filters as $key => $value) {			
		if (strpos($key, 'fecha') !== false) {
			$desde = strlen($value['desde'])==7 ? $value['desde'] . '-01' : $value['desde'];
			$hasta = strlen($value['hasta'])==7 ? $value['hasta'] . '-01' : $value['hasta'];
			
			$where .= " $key >= '$desde' AND $key <= '$hasta' AND";
		}
		else {
			$where .= " $key = '$value' AND";
		}
	}
	if(strlen($where)==5)
		$where="";
	else $where=substr($where, 0, -4);
	
	include('abm.php');
?>
