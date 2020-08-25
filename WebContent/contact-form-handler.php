<?php
	$name = $_POST['name'];
	$phone_number = $_POST['phone'];
	$email_address = $_POST['email'];
	$message = $_POST['message'];

	$to = 'contacto@masterpaintservices.com ';
	$email_subject = "Sitio Web de MPS:";
	$email_body = "Ha recibido un mensaje señor Olivio.".
	" Aquí están los detalles:\n Nombre: $name \n ".
	" Teléfonodo: $phone_number \n Correo: $email_address\n Mensaje \n $message ";

	$headers = "De: $to\n";
	$headers .= "Contestar a: $email_address ";
	mail($to,$email_subject,$email_body,$headers);
	echo "el mensaje se ha enviado";
	//redirect to the 'thank you' page
	header('Location: contact-form-thank-you.html');

?>