<?php

include_once("functions.php");
$api = 'cc5de67db7a42f90908edee5012084aa';
$amount = $_GET["amount"];
$mobile = $_GET["mobile"];
$factorNumber = $_GET["factorNumber"];
$description = $_GET["description"];
$redirect = 'http://viracam.com/paymentgateway/verify.php?itemId=' . $_GET['factorNumber'];
$result = send($api, $amount, $redirect, $mobile, $factorNumber, $description);
$result = json_decode($result);
if($result->status) {
	$go = "https://pay.ir/pg/$result->token";
	header("Location: $go");
} else {
	echo $result->errorMessage;
}
