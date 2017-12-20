<?php

require_once 'users/init.php';
require_once 'pdo_mysql.php';

//if (!securePage($_SERVER['PHP_SELF'])){ die("{}");}
//else
try{
	ini_set('memory_limit', '512M');
	//SET NAMES 'utf8';
	
    

	$id = $_GET['id'];
	
	$q = $pdo->query("UPDATE favoritos SET lastused = '".date("Y-m-d H:i:s")."' WHERE id = $id");
	
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
     die(json_encode(array('outcome' => false, 'message' => print_r($pdo->errorInfo(),true))));
}


?>
