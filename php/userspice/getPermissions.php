<?php

	require_once 'pdo_mysql.php';
	require_once 'log.php';
	$pdo->query("SET NAMES 'utf8'");

	require_once 'cors.php';

	$userId = $_GET["userId"];
	
	$sql = "SELECT P.name FROM userspice.permissions P, userspice.user_permission_matches UP
		WHERE P.id = UP.permission_id AND UP.user_id = $userId
	";
	$q = $pdo->query($sql);
	$res = $q->fetchAll(PDO::FETCH_ASSOC);
	upc_log(json_encode($res));
	echo json_encode($res);
		
?>