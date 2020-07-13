
// variables refresh()
var mult = new Array( document.getElementById("mult1"),  document.getElementById("mult2") )
var respuesta = document.getElementById("respuesta")
var buenas = 0
var malas = 0
var num1
var num2
var mensaje1 = document.getElementById("mensaje1")
var mensaje2 = document.getElementById("mensaje2")

// variables checkConf()
var boxes = new Array( 
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
var multPool = new Array() //stores the possible numbers to multiply by
var mensaje3 = document.getElementById("mensaje2")

// variables statistics()
var prevQuestions = new Array(2,3) //stores all asked questions
var timer = new Array(1)

clearCheckBoxes() // clears the configuration to default
newOperation() // Creando la primera operacion al abrir la pagina

window.onkeypress = function(event) { //detecta la techa enter para revisar la respuesta
   if (event.keyCode == 10 || event.keyCode == 13) {
      refresh()
   }
}

function refresh(){ // verifica la respuesta y crea una nueva operacion
	num1 = mult[0].innerHTML
	num2 = mult[1].innerHTML
	var givenAnswer = respuesta.value
	var trueAnswer = num1 * num2
	if(givenAnswer == trueAnswer){
		mensaje1.innerHTML = "¡Bien!"
		statistics(true)
	}else{
		mensaje1.innerHTML ="No, la respuesta es " + num1 + " x " + num2 + " = " + trueAnswer + "  ¡Sigue intentando!"
		statistics(false)
	}

	if(buenas >= 20){
		mensaje2.innerHTML = "Buen trabajo, puedes tomar un descanso"
	}
	
	newOperation()
	
}

function newOperation(){ // creates a new operation to solve
	if( multPool.length >= 1 ){ 
		mult[0].innerHTML = multPool[Math.floor((Math.random() * multPool.length))] }
	else{ 
		mult[0].innerHTML = Math.floor((Math.random() * 12) + 1) }
	mult[1].innerHTML = Math.floor((Math.random() * 12)+1)
	
	respuesta.value = ""
	respuesta.focus()
}

function timerTick( value, index ){
	timer[index] = timer[index] - 1
}

function clearCheckBoxes(){
	boxes.forEach( function (value, index){
		boxes[index].checked = false
	})
}

function checkConfig(){ //checks the checkboxes to update the operation pool
	multPool.length = 0 // clearing the array
	for (var i = boxes.length - 1; i >= 0; i--) {
		if( boxes[i].checked ){
			multPool.push(i+1)
		}
	}
	if( multPool.length == 0 ){
		mensaje2.innerHTML = "No seleccionaste ninguna tabla, ¡Repasemos todas!"
	}else{
		mensaje2.innerHTML = "Seleccionaste las tablas del " + multPool.toString()
	}
	newOperation()
}

function statistics( answer ){ //true = correct answer, false = incorrect answer
	if(answer == false){ // a bad answer is saved to be asked again shortly after
		prevQuestions.push([num1, num2])
		timer.push(3)
		malas = malas + 1
	}else if( num1 > 1 ){
		buenas = buenas + 1
	}
}
