<?php
	$opt = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
	
	$pdo = new PDO("mysql:host=localhost;dbname=intra", "root", "123", $opt);

?>