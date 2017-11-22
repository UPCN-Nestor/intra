<?php

require_once 'users/init.php';
require_once 'pdo_glm.php';
require_once 'loc.php';


if (!securePage($_SERVER['PHP_SELF'])){ 
	//header("Location: $loc");
	//die();
	echo json_encode("error");
}

else
try{
	ini_set('memory_limit', '512M');

	// FILTROS
	$socio = $_GET["socio"];
	$suministro = $_GET["sumi"];
	$dni = $_GET["dni"];

    $pdo->query("SET NAMES 'utf8'");

	$sql = "SELECT Comp_letra, Comp_numer, CompSaldo, CONVERT(varchar, Comp_vto1, 103) as Comp_vto1, CONVERT(varchar, Comp_fecha, 103) as Comp_fecha
		FROM UPCCOMPROD.dbo.COMSAL C JOIN UPCCOMPROD.dbo.SOCIOS S ON (C.SucCodigo = S.SucCodigo AND C.Soc_numero = S.Soc_numero)
		WHERE ((C.Soc_numero = $socio AND (C.Sumi_numer = $suministro OR $suministro = 0)) OR ($socio = 0 AND $suministro = 0))
			AND (S.Soc_docnro = $dni OR $dni = 0)	
			AND Comp_tipo = 3 AND CompSaldo > 0 
			AND Comp_fecha > DATEADD(mm, -6, getdate())
			AND (SELECT COUNT(*) FROM UPCCOMPROD.dbo.SUMSER SS 
				WHERE SS.SucCodigo = S.SucCodigo AND SS.Soc_numero = S.Soc_numero
					AND (SS.Sumi_numer = C.Sumi_numer) 
					AND SS.Sum2Servi = 1) > 0
		;";
	
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
