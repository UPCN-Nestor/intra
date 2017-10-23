<?php

require_once 'users/init.php';

//if (!securePage($_SERVER['PHP_SELF'])){ die("{}");}
//else
try{
	ini_set('memory_limit', '512M');
	//SET NAMES 'utf8';
	
    $pdo = new PDO("mysql:host=localhost;dbname=userspice", "root", "bitnami");

	// Valores a insertar
	$userid = $user->data()->id;
	$grid = $_GET['grid'];
	$nombre = $_GET['nombre'];
	$groupby = $_GET['groupby'];
	$sortby = $_GET['sortby'];
	$sortbyasc = $_GET['sortbyasc'];
	$ejex = $_GET['ejex'];
	$ejey = $_GET['ejey'];
	$chart = $_GET['chart'];
	$filtros = $_GET['filtros'];
	
	$q = $pdo->query("INSERT INTO favoritos
		(`userid`, `grid`, `groupby`, `nombre`, `lastused`, `sortby`, `sortbyasc`, `ejex`, `ejey`, `filtros`, `chart`) VALUES ('$userid', '$grid', '$groupby', '$nombre', '".date("Y-m-d H:i:s")."', '$sortby', '$sortbyasc', '$ejex', '$ejey', '$filtros', '$chart')"
	);
	
	//error case
	if(!$q)
	{
	  die("Execute query error, because: ". print_r($pdo->errorInfo(),true) );
	}
	//success case
	else{
		//header('Content-Type: application/json');
		$res = $q->fetchAll(PDO::FETCH_ASSOC);
		//print_r($res);
		$id = $pdo->query("SELECT LAST_INSERT_ID() AS id")->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($id, JSON_PARTIAL_OUTPUT_ON_ERROR);
		
		/*
		while ($row = $q->fetch())
		{
			
			//$json = $json . '{ "nombre": ' . $row['soc_apelli'] . ', "calle": ' . $row['Soc_calle'] . '}';
		}*/
	}

}
catch(PDOException $ex){
     die(json_encode(array('outcome' => false, 'message' => 'Fallo al conectar a la base de datos')));
}


?>
