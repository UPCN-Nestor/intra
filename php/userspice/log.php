<?php



function upc_log($text) {
	$date = date('Y-m-d H:i:s');
	$mylog = fopen("_log.txt", "a");
	fwrite($mylog, "\n". $date . "\t\t" . $text);
	fclose($mylog);
}

?>