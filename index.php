<?
require_once '/home/webuser/private/misc/constants.php';
require_once '/home/webuser/private/utility/Utility.php';

$callback = create_function('$value','if(preg_match("/(\d{1,3}\.){3}\d{1,3}/",$value))return $value;');

$allow = array_filter(explode("\n",ALLOW),$callback);
$block = array_filter(explode("\n",BLOCK),$callback);

ob_start();

//<link rel="shortcut icon" href="/v2/LLdc_bookmark.ico" type="image/x-icon" />
?>
<html>
  <head>
	<meta http-equiv="refresh" content="0;url=http://65.18.171.36/mendeley/main.htm">
  </head>
</html>
<?
$subject = 'Mendeley Visitor: ';

//if blocked
if(in_array($_SERVER['REMOTE_ADDR'],$block)){
  $subject .= 'blocked explicit';
  ob_end_clean();
}
//else if allowed
elseif(in_array($_SERVER['REMOTE_ADDR'],$allow)){
  $subject .= 'allowed explicit';
  ob_end_flush();
}
//else if allowed unless blocked
elseif(ALLOW_UNLESS_BLOCKED){
  $subject .= 'allowed default';
  ob_end_flush();
}
//else (if not allowed unless blocked)
else
{
  $subject .= 'blocked default';
  ob_end_clean();
}

if(!in_array($_SERVER['REMOTE_ADDR'],$allow))
  Utility::sendAdminEmail($subject,var_export(array($_GET,$_POST),true));
?>