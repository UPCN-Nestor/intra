<?php
	$opt = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
	
	$pdo = new PDO("mysql:host=127.0.0.1;dbname=intra", "root", "123", $opt);

?>