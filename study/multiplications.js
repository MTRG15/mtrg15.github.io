var m1 = document.getElementById("mult1")
var m2 = document.getElementById("mult2")
var r = document.getElementById("respuesta")
var buenas = 0
var malas = 0
var num1
var num2

newoperation()

window.onkeypress = function(event) {
   if (event.keyCode == 10 || event.keyCode == 13) {
   	console.log("ha presionado enter")
      refresh()
   }else{
   	console.log(event.keyCode)
   }
}

function refresh(){
	num1 = m1.innerHTML
	num2 = m2.innerHTML
	var larespuesta = r.value
	var trueanswer = num1 * num2
	if(larespuesta == trueanswer){
		document.getElementById("mensaje").innerHTML = "¡Bien!"
		buenas = buenas + 1
	}else{
		document.getElementById("mensaje").innerHTML = num1 + " x " + num2 + " = " + trueanswer
		malas = malas + 1
	}

	if(buenas >= 20){
		document.getElementById("mensaje2").innerHTML = "Excelente, puedes tomar un descanso"
	}

	newoperation()
}

function newoperation(){
	m1.innerHTML = Math.floor((Math.random() * 5)+2)
	m2.innerHTML = Math.floor((Math.random() * 11)+2)
	r.value = ""
	r.focus()
}
