<?php
	$page = $_SERVER['PHP_SELF'];
	require('check_permissions.php');

	require_once 'pdo_mysql.php';
	$pdo->query("SET NAMES 'utf8'");

	require_once 'cors.php';
	require_once 'log.php';

	$sql = "SELECT M.id_vehiculo, M.id_tipo_tarea, M.fecha, M.kms FROM
			(SELECT id_vehiculo, id_tipo_tarea, max(fecha) as fecha, max(kms) as kms FROM tal_mantenimiento GROUP BY id_vehiculo, id_tipo_tarea ORDER BY kms, fecha) M
			LEFT JOIN
			(SELECT id_vehiculo, id_tipo_tarea, max(fecha_creacion) as fecha, max(kms) as kms FROM tal_tareas T GROUP BY id_vehiculo, id_tipo_tarea) T
			ON T.id_vehiculo = M.id_vehiculo AND T.id_tipo_tarea = M.id_tipo_tarea
			WHERE 
				(M.fecha > T.fecha OR M.kms > T.kms)
		";

	$q = $pdo->query($sql);
	upc_log($sql);
	$res = $q->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($res, JSON_PARTIAL_OUTPUT_ON_ERROR);
	
?>
