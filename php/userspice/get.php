<?php
$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

require_once 'pdo_mysql.php';
$pdo->query("SET NAMES 'utf8'");

require_once 'cors.php';
require_once 'log.php';

switch ($method) {
 	
  case 'GET':		// Read. Sin parámetros devuelve todo. Soporta una cláusula "where" definida a partir de un diccionario "$filters", o bien un parámetro GET de la forma ?campo=valor (ej. ?id=1)
  	$where = 'WHERE';
		
	if(isset($_GET["filters"]))
		$filters = json_decode($_GET["filters"], true);		
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
	
	if(!isset($orderby))
		$orderby="";
	$sql = "SELECT * FROM $tabla $where $orderby";

	upc_log($sql);
	$q = $pdo->query($sql);
	$res = $q->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($res, JSON_PARTIAL_OUTPUT_ON_ERROR);
    break;

  default:
    die("error en tipo de request"); 
    break;
}

?>