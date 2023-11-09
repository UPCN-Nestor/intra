<?php
require_once 'pdo_glm.php';

try{
	ini_set('memory_limit', '512M');

	// FILTROS
	$nombre = $_GET["nombre"];
	$calle = $_GET["calle"];
	$altura = $_GET["altura"];
	$piso = $_GET["piso"];
	$depto = $_GET["depto"];

	$sql = "SELECT TOP(20) S.CliApe Soc_nombre, S.CliCod Soc_numero
		FROM [UPCN_COM_PROD].dbo.PERSONA S JOIN [UPCN_COM_PROD].dbo.CUENTA SU ON (S.SucCod = SU.SucCod AND S.CliCod = SU.CliCod)
		WHERE SU.SumSts < 4
			AND (S.CliApe LIKE '%$nombre%' OR '$nombre'='0')
			AND ((SU.SumCll2 = '$calle' AND SU.SumAlt2 = '$altura') OR '$calle'='0')		
			AND (SU.SumPis2 = '$piso' OR '$piso'='x')
			AND (SU.SumDto2 = '$depto' OR '$depto'='x')			
		GROUP BY S.CliApe, S.CliCod        
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