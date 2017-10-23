<?php

require_once 'users/init.php';
require_once 'pdo.php';
require_once 'loc.php';

if (!securePage($_SERVER['PHP_SELF'])){ 
	//header("Location: $loc");
	//die();
	echo json_encode("error");
}

else
try{
	ini_set('memory_limit', '512M');
	//SET NAMES 'utf8';
	//echo "x";
    //$pdo = new PDO ("odbc:UPCNDESA", "sa", "mateando");

	// FILTROS
	$desde = ""; $hasta = "";
	$filters = json_decode($_GET["filters"], true);	
	if (count($filters) > 0) {
		$desde = str_replace($filters["Periodo"]["desde"], '-', '');
		$hasta = str_replace($filters["Periodo"]["hasta"], '-', '');
		//echo $desde;
		//echo $hasta;
	}
	
	if($desde == "")
		$desde = "190001";
	if($hasta == "")
		$hasta = "210001"; // y2.1k unsafe!
	
	$desde_ano = substr($desde, 0, 4);
	
    $pdo->query("SET NAMES 'utf8'");

	$sql = "
SELECT Cons_area, ETTCodigo, Cons_cate, Periodo, Consumo, Pico, FPico, Valle, Reactiva, PotPico, PotFPico 
FROM (		
	SELECT Cons_area, ETTCodigo, Cons_cate, CAST(Cons_ano AS varchar(4)) + RIGHT(REPLICATE('0', 2) + '-' + CAST(Cons_mes AS varchar(2)), 2) AS Periodo,
       SUM(Cons_consu) AS Consumo,
       SUM(Cons_conpi * Cons_multi) AS Pico,
       SUM(Cons_confp * Cons_multi) AS FPico,
       SUM(Cons_conva * Cons_multi) AS Valle,
       SUM(Cons_coner * Cons_multi) AS Reactiva,
       SUM(Cons_potde * Cons_multi) AS PotPico,
       SUM(Cons_potfu * Cons_multi) AS PotFPico
	FROM CONSUM CO JOIN EPRE02 E2 ON (CO.Cons_sucur = E2.ETTSucurs AND CO.Cons_Serv = E2.ETTServic AND CO.Cons_cate = E2.ETTCatego) 
	WHERE Cons_sucur = 1 AND Cons_serv = 1 AND Cons_ano >= $desde_ano
	GROUP BY Cons_area, ETTCodigo, Cons_cate, Cons_ano, Cons_mes) B
WHERE Periodo >= '$desde' AND Periodo <= '$hasta'
";
	
	//echo $sql;
	
	$q = $pdo->query($sql);
	
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
	}

}
catch(PDOException $ex){
     die(json_encode(array('outcome' => false, 'message' => $ex->getMessage())));
}


?>
