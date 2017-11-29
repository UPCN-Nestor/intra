<?php
$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

require_once 'pdo_mysql.php';
$pdo->query("SET NAMES 'utf8'");

require_once 'cors.php';
require_once 'log.php';

switch ($method) {
  case 'PUT':		// Update
    parse_str(file_get_contents('php://input'), $_PUT);
    
	$sql = "UPDATE $tabla SET ";
	foreach($_PUT as $key => $value)
		$sql = $sql . "$key = '$value',";
	$id = $_PUT['id'];
	$sql = substr($sql, 0, -1) . " WHERE id = $id;";
	
	//echo $sql;
	
	try{ $q = $pdo->exec($sql); echo $q; }
	catch(PDOException $e) { echo $e->getMessage();	}
    break;
	
  case 'POST':		// Create
	$sql = "INSERT INTO $tabla (";

    foreach($_POST as $key => $value)
		$sql = $sql . "$key,";	
	$sql = substr($sql, 0, -1) . ") values (";
	foreach($_POST as $key => $value)
		$sql = $sql . "'$value',";
	$sql = substr($sql, 0, -1) . ");";
	
	try{ $q = $pdo->exec($sql); 
		$res = $pdo->lastInsertId();
		echo json_encode($res, JSON_PARTIAL_OUTPUT_ON_ERROR);
	}
	catch(PDOException $e) { echo '["error"]';	}
    break;
	
  case 'GET':		// Read. Sin parámetros devuelve todo. Soporta una cláusula "where" definida a partir de un diccionario "$filters", o bien un parámetro GET de la forma ?campo=valor (ej. ?id=1)
  	$where = 'WHERE';
	if(isset($filters)) foreach($filters as $key => $value) {			
		if (strpos($key, 'fecha') !== false) {
			$desde = strlen($value['desde'])==7 ? $value['desde'] . '-01' : $value['desde'];
			$hasta = strlen($value['hasta'])==7 ? $value['hasta'] . '-31' : $value['hasta'];
			
			if($desde=="") $desde='1000-01-01';
			if($hasta=="") $hasta='9999-01-01';
			
			$where .= " $key >= '$desde' AND $key <= '$hasta' AND";
		}
		else {
			$where .= " $key = '$value' AND";
		}
	}
	if(strlen($where)==5)
		$where="";
	else $where=substr($where, 0, -4);
	
	if(!isset($filters) && strlen($where)==0) {
		foreach($_GET as $key => $value)
			$where = "WHERE $key = '$value'";
	}
	
	$sql = "SELECT * FROM $tabla $where";

	upc_log($sql);
	$q = $pdo->query($sql);
	$res = $q->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($res, JSON_PARTIAL_OUTPUT_ON_ERROR);
    break;
	
  case 'DELETE':	// Delete
	$sql = "DELETE FROM $tabla WHERE id = " . $_GET['id'] . ";";

	try{ $q = $pdo->exec($sql); echo $q; }
	catch(PDOException $e) { echo $e->getMessage();	}
    break;
	
  default:
    die("error en tipo de request"); 
    break;
}

?>