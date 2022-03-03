var num1, num2
var list = new Array(10)
var auxnum = new Array(9)
var aux = new Array(2)
var digits = new Array(3)
	digits[0] = new Array(2)
	digits[1] = new Array(2)
	digits[2] = new Array(2)
var cont = 0
function limpiar(){
	for (var i = list.length - 1; i >= 0; i--) {
		list[i] = false
		auxnum[i] = i+1
	} 
}
var sop, sop2, sop3
var digit

function checkList(number){	
	if (number > 9){
		digit = new Array(2)
		digit[1] = number /10
		digit[0] = number % 10
		//el numero ahora es [1][0]
	}else{
		digit = new Array(1)
		digit[0] = number
	}

	for (var i = digit.length - 1; i >= 0; i--) {
		if (list[digit[i]] == false){
			list[digit[i]] == true
			
		}else{
			return false	// no es usable
		}		
	}
	return true //es usable

}

function probando(num1, num2){
	digits[cont] = [num1, num2]
	var num3, num4
	var funciona = false
	console.log("ronda "+cont+" probando con "+num1+":"+num2)
	for (var i = list.length - 2; i >= 0; i--) {
		if(checkList(num1 * auxnum[i]) == true)
			num3 = num1 * (i+1)
		else
			num3 = 0
		 
		if(checkList(num2 * auxnum[i]) == true)
			num4 = num2 * (i+1)
		else
			num4 = 0
		if(num3 != 0 && num4 != 0){
			funciona = true
			digits[cont] = [num3, num4]
			//console.log("se encontro un par"+digits[cont])
		}

		
	}
    if(cont == 2)
		console.log(digits)
	
	
	
	
	if(funciona == true)
		return digits[cont]
	


}

limpiar()

for (var i = 1; i < list.length-1; i++) {
	cont = 0
	for (var j = 2; j < list.length-1 ; j++) {
		

	}
	
}

