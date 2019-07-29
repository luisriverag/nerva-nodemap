<?php
$dir = 'data/historical';
$files = array_diff(scandir($dir), array('..', '.'));
foreach($files as $value) {
	echo str_replace(".txt", "", $value);
	echo "<br>";
}
?>
