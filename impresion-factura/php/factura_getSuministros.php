<?php

require_once 'pdo_glm.php';

try{
	ini_set('memory_limit', '512M');

	// FILTROS
	$soc = $_GET["socio"];
	$dni = $_GET["dni"];

	$sql = "SELECT S.CliApe Soc_nombre, S.CliCod Soc_numero, SU.SumNro Sumi_numer, SU.SumCll2 Sumi_calle, SU.SumAlt2 Sumi_nroca, SU.SumPis2 Sumi_piso, SU.SumDto2 Sumi_depto, ROUND(EXP(SUM(LOG(ISNULL(SV.TipoServ,1)))),0) Servicios, ISNULL(CS.Impago,0) Impago 
	FROM [UPCN_COM_PROD].dbo.PERSONA S JOIN [UPCN_COM_PROD].dbo.CUENTA SU ON (S.SucCod = SU.SucCod AND S.CliCod = SU.CliCod)
		LEFT JOIN (SELECT DISTINCT SumNro, CliCod, ISNULL(CASE SrvCod WHEN 1 THEN 2 WHEN 5 THEN 3 WHEN 10 THEN 5 ELSE 1 END, 1) AS TipoServ 
				FROM [UPCN_COM_PROD].dbo.CONTRATO WHERE Sum2Sts < 4) SV 
			ON SV.SumNro = SU.SumNro AND SV.CliCod = S.CliCod
		LEFT JOIN (SELECT SumNro, CliCod, ROUND(SUM(CASE WHEN CS.CompCodDC = 'D' THEN CS.CompImp ELSE -CS.CompImp END), 2) Impago FROM [UPCN_COM_PROD].dbo.COMSAL CS
				WHERE CompTpo = 3 AND CS.CompImp > 0 
				GROUP BY SumNro, CliCod) CS  
			ON CS.SumNro = SU.SumNro AND CS.CliCod = S.CliCod
	WHERE (S.CliCod = $soc OR $soc = 0) AND (S.CliDocNro = $dni OR $dni = 0)
		AND SU.SumFecBaj = '1753-01-01 00:00:00.000'
	GROUP BY S.CliApe, S.CliCod, SU.SumNro, SU.SumCll2, SU.SumAlt2, SU.SumPis2, SU.SumDto2, CS.Impago
	ORDER BY SU.SumNro 
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