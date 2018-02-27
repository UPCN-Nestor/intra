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
	$nombre = $_GET["nombre"];
	$calle = $_GET["calle"];
	$altura = $_GET["altura"];
	
    $pdo->query("SET NAMES 'utf8'");

	$sql = "SELECT TOP(20) S.Soc_apelli, S.Soc_numero
		FROM UPCCOMPROD.dbo.SOCIOS S JOIN UPCCOMPROD.dbo.SUMINI SU ON (S.SucCodigo = SU.SucCodigo AND S.Soc_numero = SU.Soc_numero)
		WHERE SU.Sumi_estad < 4
			AND (S.Soc_apelli LIKE '%$nombre%' OR '$nombre'='0')
			AND ((SU.Sumi_calle = '$calle' AND SU.Sumi_nroca = '$altura') OR '$calle'='0')		
			AND (SELECT COUNT(*) FROM UPCCOMPROD.dbo.COMSAL CS WHERE CS.Soc_numero = S.Soc_numero AND CS.SucCodigo = S.SucCodigo AND CS.Sumi_numer = SU.Sumi_numer
				AND CS.Comp_tipo = 3 AND CS.CompSaldo > 0 
				AND CS.Comp_fecha > DATEADD(mm, -6, getdate())
				AND (SELECT COUNT(*) FROM UPCCOMPROD.dbo.SUMSER SS 
					WHERE SS.SucCodigo = CS.SucCodigo AND SS.Soc_numero = CS.Soc_numero AND SS.Sumi_numer = CS.Sumi_numer AND SS.Sum2Servi = 1) > 0
				) > 0	
				
		GROUP BY S.Soc_apelli, S.Soc_numero
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