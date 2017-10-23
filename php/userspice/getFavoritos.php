<?php

require_once 'users/init.php';

//if (!securePage($_SERVER['PHP_SELF'])){ die("{}");}
//else
try{
	ini_set('memory_limit', '512M');
	//SET NAMES 'utf8';
	
    $pdo = new PDO("mysql:host=localhost;dbname=userspice", "root", "bitnami");

	$grid = $_GET['grid'];
	$u = $user->data()->id;
	
	$q = $pdo->query("SELECT * FROM favoritos WHERE grid = '$grid' AND (userid = '$u' or userid = 0)");
	
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
		echo json_encode($res, JSON_PARTIAL_OUTPUT_ON_ERROR);

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
