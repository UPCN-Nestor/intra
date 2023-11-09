<?php

require_once 'pdo_glm.php';

try{
	ini_set('memory_limit', '512M');

	// FILTROS
	$socio = $_GET["socio"];
	$suministro = $_GET["sumi"];
	$dni = $_GET["dni"];

    //$pdo->query("SET NAMES 'utf8'");

	$sql = "SELECT FC.FactLet AS Comp_letra, FC.FactPtoV AS Comp_sucur, FC.FactNro AS Comp_numer, RC.ResuImp AS CompSaldo, 
        MIN(FS.Fac1Srv) AS Fac1Srv, FC.FrmCod AS Comp_tipo,
        CONVERT(varchar, FC.FactVto1, 103) AS Comp_vto1, CONVERT(varchar, FC.FactFec, 103) as Comp_fecha,
        CASE WHEN CS.SucCod IS NULL THEN 'S' ELSE 'N' END AS Pagada,
        convert(varchar, FC.FactFec, 105) fecha,
        FS.Fac1Ctg cat,
        CONCAT(FC.FrmCod, '-', FC.FactLet, '-', FC.FactPtoV, '-', FC.FactNro) numero
FROM [UPCN_COM_PROD].dbo.FACTUC FC 			
	  JOIN [UPCN_COM_PROD].dbo.FACTUS FS ON (FC.SucCod = FS.SucCod AND FC.CliCod = FS.CliCod AND FC.SumNro = FS.SumNro AND 
							FC.FactFec = FS.FactFec AND FC.FrmCod = FS.FrmCod AND FC.FactLet = FS.FactLet AND
							FC.FactPtoV = FS.FactPtoV AND FC.FactNro = FS.FactNro)
	  JOIN [UPCN_COM_PROD].dbo.RESUMC RC ON (FC.SucCod = RC.SucCod AND FC.CliCod = RC.CliCod AND FC.SumNro = RC.SumNro AND 
							FC.FactFec = RC.ResuFec AND FC.FrmCod = RC.ResuTpo AND FC.FactLet = RC.ResuLet AND
							FC.FactPtoV = RC.ResuPtoV AND FC.FactNro = RC.ResuNro)
	  JOIN [UPCN_COM_PROD].dbo.PERSONA S ON (FC.SucCod = S.SucCod AND FC.CliCod = S.CliCod)
	  LEFT OUTER JOIN [UPCN_COM_PROD].dbo.COMSAL CS ON (FC.SucCod = CS.SucCod AND FC.CliCod = CS.CliCod AND FC.SumNro = CS.SumNro AND 
						FC.FrmCod = CS.CompTpo AND FC.FactLet = CS.CompLet AND
						FC.FactPtoV = CS.CompPtoV AND FC.FactNro = CS.CompNro)
WHERE ((FC.CliCod = $socio AND (FC.SumNro = $suministro OR $suministro = 0)) OR ($socio = 0 AND $suministro = 0))
AND (S.CliDocNro = $dni OR $dni = 0)	
AND FC.FrmCod = 3 AND RC.ResuImp > 0 
AND FC.FactFec > DATEADD(mm, -12, getdate())
AND FC.SucCod = 1 AND FC.CliCod BETWEEN 0 AND 199999 
AND FC.Factquin <> 9 AND FC.FactAnu = 0 AND FS.Fac1Srv IN (1,5,10)
GROUP BY FC.FactLet, FC.FactPtoV, FC.FactNro, RC.ResuImp, FC.FrmCod, FC.FactVto1, FC.FactFec, CS.SucCod, FS.Fac1Ctg
HAVING (MIN(FS.Fac1Srv) <> 1 OR FC.FactPtoV = 12)
ORDER BY FC.FactFec DESC, FC.FactVto1 DESC, FC.FactPtoV
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
