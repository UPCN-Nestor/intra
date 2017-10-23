<?php
/*
UserSpice 4
An Open Source PHP User Management System
by the UserSpice Team at http://UserSpice.com
 
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
 
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
ini_set("allow_url_fopen", 1);
if(isset($_SESSION)){session_destroy();}
?>
<?php require_once 'init.php'; ?>

<?php
$db = DB::getInstance();
$settingsQ = $db->query("SELECT * FROM settings");
$settings = $settingsQ->first();
 
$remember = true;
$user = new User();
$login = $user->loginEmail($_GET["username"], trim($_GET["password"]), $remember);

if($login)
	echo json_encode($user->data());
else
	echo json_encode("error");

?>
 