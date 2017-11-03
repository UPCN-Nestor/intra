<?php

require_once 'users/init.php';
require_once 'pdo.php';

//if (!securePage($_SERVER['PHP_SELF'])){ die("{}");}
//else
try{
	ini_set('memory_limit', '512M');
	//SET NAMES 'utf8';
	
	$campo = $_GET['campo'];
	
    $pdo->query("SET NAMES 'utf8'");;

	$q = $pdo->query("SELECT DISTINCT($campo) AS $campo 
FROM UPCCOMPROD.dbo.CONSUM CO JOIN UPCCOMPROD.dbo.EPRE02 E2 ON (CO.Cons_sucur = E2.ETTSucurs AND CO.Cons_Serv = E2.ETTServic AND CO.Cons_cate = E2.ETTCatego)
WHERE Cons_sucur = 1 AND Cons_serv = 1 ");
	
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
