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

	$sql = "SELECT FC.Fact_letra AS Comp_letra, FC.Fact_sucur AS Comp_sucur, FC.Fact_numer AS Comp_numer, RC.Resu_impor AS CompSaldo, MIN(FS.Fac1Servic) AS Fac1Servic, FC.Form_codig AS Comp_tipo,
				CONVERT(varchar, FC.Fact_fecvt, 103) AS Comp_vto1, CONVERT(varchar, FC.Fact_fecha, 103) as Comp_fecha,
				CASE WHEN CS.SucCodigo IS NULL THEN 'S' ELSE 'N' END AS Pagada
			FROM UPCCOMPROD.dbo.FACTUC FC 			
				  JOIN UPCCOMPROD.dbo.FACTUS FS ON (FC.SucCodigo = FS.SucCodigo AND FC.Soc_numero = FS.Soc_numero AND FC.Sumi_numer = FS.Sumi_numer AND 
										FC.Fact_fecha = FS.Fact_fecha AND FC.Form_codig = FS.Form_codig AND FC.Fact_letra = FS.Fact_letra AND
										FC.Fact_sucur = FS.Fact_sucur AND FC.Fact_numer = FS.Fact_numer)
				  JOIN UPCCOMPROD.dbo.RESUMC RC ON (FC.SucCodigo = RC.SucCodigo AND FC.Soc_numero = RC.Soc_numero AND FC.Sumi_numer = RC.Sumi_numer AND 
										FC.Fact_fecha = RC.Resu_fecha AND FC.Form_codig = RC.Resu_tipo AND FC.Fact_letra = RC.Resu_letra AND
										FC.Fact_sucur = RC.Resu_secci AND FC.Fact_numer = RC.Resu_numer)
				  JOIN UPCCOMPROD.dbo.SOCIOS S ON (FC.SucCodigo = S.SucCodigo AND FC.Soc_numero = S.Soc_numero)
				  LEFT OUTER JOIN UPCCOMPROD.dbo.COMSAL CS ON (FC.SucCodigo = CS.SucCodigo AND FC.Soc_numero = CS.Soc_numero AND FC.Sumi_numer = CS.Sumi_numer AND 
									FC.Form_codig = CS.Comp_tipo AND FC.Fact_letra = CS.Comp_letra AND
									FC.Fact_sucur = CS.Comp_secci AND FC.Fact_numer = CS.Comp_numer)
		WHERE ((FC.Soc_numero = $socio AND (FC.Sumi_numer = $suministro OR $suministro = 0)) OR ($socio = 0 AND $suministro = 0))
			AND (S.Soc_docnro = $dni OR $dni = 0)	
			AND FC.Form_codig = 3 AND RC.Resu_impor > 0 
			AND FC.Fact_fecha > DATEADD(mm, -12, getdate())
			AND FC.SucCodigo = 1 AND FC.Soc_numero BETWEEN 0 AND 99999 
			AND FC.Fact_quin <> 9 AND FC.FactArea <> 'EP' AND FS.Fac1Servic IN (1,5,10)
		GROUP BY FC.Fact_letra, FC.Fact_sucur, FC.Fact_numer, RC.Resu_impor, FC.Form_codig, FC.Fact_fecvt, FC.Fact_fecha, CS.SucCodigo
		ORDER BY FC.Fact_fecha DESC, FC.Fact_fecvt DESC
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
