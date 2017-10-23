<?php


require_once 'users/init_upc.php';
if (!securePage($_SERVER['PHP_SELF'])){ die("{}");}

else
try{
	ini_set('memory_limit', '512M');
	//SET NAMES 'utf8';
	
    $pdo = new PDO ("odbc:UPCNDESA", "sa", "mateando");
	//$pdo = new PDO ("dblib:host=192.168.0.8:1433;dbname=UPCCOMDESA","sa","mateando");
	
    $pdo->query("SET NAMES 'utf8'");;
	
	/*
	$q = $pdo->query('SELECT top 10000 ltrim(rtrim(soc_apelli)) as nombre, ltrim(rtrim(Soc_calle)) as calle, Sec_codigo as seccion FROM SOCIOS');*/

	$q = $pdo->query("SELECT Cons_area, ETTCodigo, Cons_cate, CAST(Cons_ano AS varchar(4)) + RIGHT(REPLICATE('0', 2) + CAST(Cons_mes AS varchar(2)), 2) AS Periodo,
       SUM(Cons_consu) AS Consumo,
       SUM(Cons_conpi * Cons_multi) AS Pico,
       SUM(Cons_confp * Cons_multi) AS FPico,
       SUM(Cons_conva * Cons_multi) AS Valle,
       SUM(Cons_coner * Cons_multi) AS Reactiva,
       SUM(Cons_potde * Cons_multi) AS PotPico,
       SUM(Cons_potfu * Cons_multi) AS PotFPico
FROM CONSUM CO JOIN EPRE02 E2 ON (CO.Cons_sucur = E2.ETTSucurs AND CO.Cons_Serv = E2.ETTServic AND CO.Cons_cate = E2.ETTCatego)
WHERE Cons_sucur = 1 AND Cons_serv = 1 AND Cons_ano = 2017
GROUP BY Cons_area, ETTCodigo, Cons_cate, Cons_ano, Cons_mes
ORDER BY Cons_area, ETTCodigo");
	
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
