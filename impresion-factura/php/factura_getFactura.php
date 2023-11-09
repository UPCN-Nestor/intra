<?php
	require_once 'pdo_glm.php';

	$fecha = $_GET["fecha"];
	$cat = $_GET["cat"];
	$numero = $_GET["numero"];

	$source = "https://oficina.upcnecochea.com.ar:8443/api/factura-digital-individual/$fecha/$cat/$numero";
	//echo $source;
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $source);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$data = curl_exec($ch);
	//echo $data;

	if (curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200) {
		// Save the API response as a PDF file
		$file = 'facturas/fact_mensual_' . $numero . '.pdf';
		file_put_contents($file, $data);
		echo "PDF saved successfully.";
	} else {
		echo "Error occurred while fetching the PDF.";
	}

	curl_close($ch);
	

	$sql = "INSERT INTO [UPCN_SISTEMAS].dbo.log_totem_impresion_factura VALUES (GETDATE(), '$source');";
	echo $sql;
	$q = $pdo->query($sql);
	

?>