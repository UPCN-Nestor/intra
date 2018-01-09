<?php
	$page = $_SERVER['PHP_SELF'];
	require('check_permissions.php');

	$tabla = "tal_tareas";
	
	// *** Si se está insertando desde formulario, se calcula la orden de trabajo (se permite editarla manualmente desde la grilla)	
	if(!isset($_POST["id_orden_trabajo"])) {		
		require_once 'pdo_mysql.php';
		$pdo->query("SET NAMES 'utf8'");
		
		$f = $_POST['fecha_creacion'];
		$v = $_POST['id_vehiculo'];
		$sql="SELECT ID FROM TAL_ORDENES_TRABAJO WHERE FECHA < '$f' AND ID_VEHICULO = '$v' ORDER BY FECHA DESC";
		
		try{ $q = $pdo->query($sql)->fetch()['ID']; $_POST["id_orden_trabajo"] = $q; }
		catch(PDOException $e) { echo '["error"]';	}
	}		
	// ***
	
	include('abm.php');
?>
