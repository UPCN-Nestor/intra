<?php

	$letra = $_GET["letra"];
	$numero = $_GET["numero"];
	$pto = $_GET["pto"];
	$servicio = $_GET["servicio"] ? $_GET["servicio"] : 1;
	
	$source = "http://www.upcnecochea.com.ar/iReport/factura.php?tipo=3&letra=" . $letra . "&pto=$pto&nro=" . $numero . "&servicio=$servicio";
	echo $source;
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $source);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$data = curl_exec($ch);
	echo $data;
	curl_close($ch);
	
	
	$pdf = "http://www.upcnecochea.com.ar/iReport/report/pdf/fact_mensual_$letra-$pto-$numero.pdf";
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $pdf);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$Result = curl_exec($ch);
	$file = 'facturas/fact_mensual_' .$letra . '-'. $pto .'-' . $numero . '.pdf';		
	file_put_contents($file, $Result);
	curl_close($ch);


?>