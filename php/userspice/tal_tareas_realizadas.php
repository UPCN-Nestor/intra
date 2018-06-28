<?php
	$page = $_SERVER['PHP_SELF'];
	require('check_permissions.php');

	require_once 'pdo_mysql.php';
	$pdo->query("SET NAMES 'utf8'");

	require_once 'cors.php';
	require_once 'log.php';

	$sql = "SELECT V.id AS id_vehiculo, TT.id as id_tipo_tarea, IFNULL(T.fecha, '0000-00-00') fecha FROM tal_vehiculos V JOIN tal_tipos_tareas TT LEFT JOIN
	(SELECT id_vehiculo, id_tipo_tarea, MAX(fecha_creacion) fecha FROM tal_tareas GROUP BY id_vehiculo, id_tipo_tarea) T ON V.id = T.id_vehiculo AND TT.id = T.id_tipo_tarea
WHERE TT.tipo = 'Preventivo'
ORDER BY fecha
		";

	$q = $pdo->query($sql);
	upc_log($sql);
	$res = $q->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($res, JSON_PARTIAL_OUTPUT_ON_ERROR);
	
?>
