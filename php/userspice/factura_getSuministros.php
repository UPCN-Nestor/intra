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
	$soc = $_GET["socio"];
	$dni = $_GET["dni"];
	
    $pdo->query("SET NAMES 'utf8'");

	$sql = "SELECT S.Soc_apelli, S.Soc_numero, SU.Sumi_numer, SU.Sumi_calle, SU.Sumi_nroca, SU.Sumi_piso, SU.Sumi_depto, ROUND(EXP(SUM(LOG(ISNULL(SV.TipoServ,1)))),0) Servicios, ISNULL(CS.Impago,0) Impago
		FROM UPCCOMPROD.dbo.SOCIOS S JOIN UPCCOMPROD.dbo.SUMINI SU ON (S.SucCodigo = SU.SucCodigo AND S.Soc_numero = SU.Soc_numero)
			LEFT JOIN (SELECT DISTINCT Sumi_numer, Soc_numero, ISNULL(CASE Sum2Servi WHEN 1 THEN 2 WHEN 5 THEN 3 WHEN 10 THEN 5 ELSE 1 END, 1) AS TipoServ 
					FROM UPCCOMPROD.dbo.SUMSER WHERE Sum2Estad < 4) SV 
				ON SV.Sumi_numer = SU.Sumi_numer AND SV.Soc_numero = S.Soc_numero
			LEFT JOIN (SELECT Sumi_numer, Soc_numero, ROUND(SUM(CASE Comp_codig WHEN 'D' THEN CompSaldo ELSE -CompSaldo END), 2) Impago FROM UPCCOMPROD.dbo.COMSAL 
					WHERE Comp_tipo = 3 AND CompSaldo > 0 
					GROUP BY Sumi_numer, Soc_numero) CS  
				ON CS.Sumi_numer = SU.Sumi_numer AND CS.Soc_numero = S.Soc_numero
		WHERE (S.Soc_numero = $soc OR $soc = 0) AND (S.Soc_docnro = $dni OR $dni = 0)
			AND SU.Sumi_fecba = '1753-01-01 00:00:00.000'
		GROUP BY S.Soc_apelli, S.Soc_numero, SU.Sumi_numer, SU.Sumi_calle, SU.Sumi_nroca, SU.Sumi_piso, SU.Sumi_depto, CS.Impago
		ORDER BY SU.Sumi_numer DESC
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