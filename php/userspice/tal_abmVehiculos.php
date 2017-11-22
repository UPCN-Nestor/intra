<?php
$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

require_once 'pdo_mysql.php';
$pdo->query("SET NAMES 'utf8'");

require_once 'cors.php';

switch ($method) {
  case 'PUT':		// Update
    parse_str(file_get_contents('php://input'), $_PUT);
    var_dump($_PUT); //$_PUT contains put fields 		
    break;
	
  case 'POST':		// Create
	$sql = "INSERT INTO tal_tipos_vehiculos (";

    foreach($_POST as $key => $value)
		$sql = $sql . "$key,";	
	$sql = substr($sql, 0, -1) . ") values (";
	foreach($_POST as $key => $value)
		$sql = $sql . "'$value',";
	$sql = substr($sql, 0, -1) . ");";
	
	echo $sql;
	try{
		$q = $pdo->exec($sql);
	}
	catch(PDOException $e) {
		echo $e->getMessage();
	}
    break;
	
  case 'GET':		// Read		
	$sql = "
		SELECT * FROM tal_tareas
		";

	$q = $pdo->query($sql);
	$res = $q->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($res, JSON_PARTIAL_OUTPUT_ON_ERROR);
    break;
	
  case 'DELETE':	// Delete
    echo('DELETE');
    break;
	
  default:
    die("error en tipo de request"); 
    break;
}

?>