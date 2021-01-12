//Object to handle all the html elements that display information to the user
class HTMLHandler{
	// operandores de la multiplicacion
	static mult = new Array(  
	 	document.getElementById("mult1"),  
	 	document.getElementById("mult2") 
	 	)
	//campo de texto para responder
	static respuesta = document.getElementById("respuesta") 
	// Informs if the player gave the right answer or not
	static mensaje1 = document.getElementById("mensaje1")
	// General purpose message area (cofiguration, end of session etc)
	static mensaje2 = document.getElementById("mensaje2")
	// Menu seleccion de tablas a repasar
	static boxes = new Array( 
		document.getElementById("tabla1"),
		document.getElementById("tabla2"),
		document.getElementById("tabla3"),
		document.getElementById("tabla4"),
		document.getElementById("tabla5"),
		document.getElementById("tabla6"),
		document.getElementById("tabla7"),
		document.getElementById("tabla8"),
		document.getElementById("tabla9"),
		document.getElementById("tabla10"),
		document.getElementById("tabla11"),
		document.getElementById("tabla12")
		)
	// Writes the given message into an HTML element
	writeMessage(message, place){
		try{
			place.innerHTML( message.toString() )
		}catch(error){
			console.log(`The given HTML object ${message} cannot be written on`)
		}
	}
	/*********************************** FUNCTIONS *************************************/
	
}

/* creates a session for the user with a randomized pool of multiplications, 
displays it on screen, takes the answer and indicates if it's correct 
tracks the number of correct answers and stores the incorrect ones to be 
asked once again after a certain number of operations.
After all the pool is deemed as learned, the session indicates the user
that it can stop, but will keep working undefinitely if the user keeps
answering */
class MultiplicationSession extends HTMLHandler{
	var num1
	var num2
	var input
	var realAnswer
	var goodAns
	var badAns
	/*each list works like a pile, where each index stores 2 values
	one for each multiplication operand*/
	var pUnlearned
	var PInProgress
	var pLearned
	var num_of_mult_to_solve
	/************************************************************/
	/*********************dialogue variables*******************/
	var successMsg = [
		"Correcto",
		"Muy bien",
		"Excelente",
		"Tienes una memoria maravillosa",
		"Has estudiado bastante, se nota"]
	var failMsg = [
		"Incorrecto",
		"No",
		"Intenta de nuevo",
		"No pareces estar progresando",
		"Toma un minuto para revisar las tablas de nuevo"]
	var startMsg = [
		"Prepárate... Listos... ¡Ya!",
		"Veamos qué tanto sabes",
		"Se ve bastante fácil, no tardarás mucho",
		"¿Puedes responder todas sin fallar?",
		"¿Vuelves por la revancha?"]
	var endMsg = [
		"¡Al fin! Has acabado",
		"No fue tan dificil como creia",
		"Lo hiciste muy bien",
		"Creo que has roto un tiempo récord",
		"No te equivocaste ni una vez ¡¡¡Asombroso!!!"]
	var confMsg = [
		"Configuración por defecto (todas las tablas)",
		""]
	/**************************** FUNCTIONS ************************************/
	constructor(){
		goodAns = badAns = 0
		/**Unlearned: multiplications that haven't been marked as learnt*/ 
		this.pUnlearned = new Array()
		/*In Progress: multiplications that are in the process of being memorized*/
		this.PInProgress = new Array()
		/*Multiplications that have been answered right several times in a row*/
		this.pLearned = new Array()
	}	

	// Verifies if the input of the user is the correct answer to the given operation
	checkAnswer(){ // verifica la respuesta y crea una nueva operacion
		num1 = mult[0].innerHTML
		num2 = mult[1].innerHTML
		input = respuesta.value
		realAnswer = num1 * num2

		if(input == realAnswer){
			writeMessage(mensaje1, "¡Bien hecho!")
			goodAns++
			badAns = 0 
		}else{
			mensaje1.innerHTML ="No, la respuesta es " + num1 + " x " + num2 + " = " + realAnswer + "  ¡Sigue intentando!"
			badAns++
			goodAns = 0
		}

		if( this.pUnlearned.){
			mensaje2.innerHTML = "Buen trabajo, puedes tomar un descanso si quieres"
		}
		
		newOperation()
		
	}

	newPool(){ 
		goodAns = 0
		pUnlearned.length = 0
		for (var i = 0; i < 20; i++) {
			
		}

		if( pUnlearned.length >= 1 ){ 
			mult[0].innerHTML = pUnlearned[Math.floor((Math.random() * pUnlearned.length))] }
		else{ 
			mult[0].innerHTML = Math.floor((Math.random() * 12) + 1) }
		mult[1].innerHTML = Math.floor((Math.random() * 12)+1)
		
		respuesta.value = ""
		respuesta.focus()
	}

	clearCheckBoxes(){ // Unchecks all the checkboxes on the multiplication selection menu
		boxes.forEach( function (value, index){
			boxes[index].checked = false
		})
		mensaje2.innerHTML = "Configuración por defecto (todas las tablas)"
	}

	checkConfig(){ //checks the checkboxes to update the operation pool
		pUnlearned.length = 0 // clearing the array
		for (var i = boxes.length - 1; i >= 0; i--) {
			if( boxes[i].checked ){
				pUnlearned.push(i+1)
			}
		}
		if( pUnlearned.length == 0 ){
			mensaje2.innerHTML = "No seleccionaste ninguna tabla, ¡Repasemos todas!"
		}else{
			/* .toString prints all selected boxes in order*/
			mensaje2.innerHTML = "Seleccionaste las tablas del " + pUnlearned.toString()
		}
		newOperation()
	}

	/*Contains a list of messages for the different interactions with the user, the point of this
	function is to make it seem less repetitive and incentivize a real sense of being noticed
	and rewarded. 
	The type argument serves to indicate the context of the comment pool to choose
	The msgBox argument indicates where the message will be written
	The index argument indicates the exact message to be displayed (positive value). 
	-1 indicates the use of a random message chosen by the scores of the user*/

	dialogueMessages(type, msgBox, index){

	}


	/*If the user presses enter or \n the answer will be checked*/
	window.onkeypress = function(event) { //detecta la techa enter para revisar la respuesta
   		if (event.keyCode == 10 || event.keyCode == 13) {
      		checkAnswer()
   		}
	}
}


/*Contiene una lista de mensajes variados para presentar en pantalla luego de las distintas acciones 
que se ejecuten. */
