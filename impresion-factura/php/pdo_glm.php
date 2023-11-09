<?php

	//phpinfo();

	$serverName = "192.168.0.230"; // or the name of your SQL Server instance
	$connectionOptions = array(
		"Database" => "UPCN_COM_PROD",
		"Uid" => "consultas",
		"PWD" => "Csua2018"
	);

	try {
		$pdo = new PDO("sqlsrv:Server=$serverName;Database={$connectionOptions['Database']}", $connectionOptions['Uid'], $connectionOptions['PWD']);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		//echo "Connected successfully";
	} catch (PDOException $e) {
		die("Connection failed: " . $e->getMessage());
	}
?>	