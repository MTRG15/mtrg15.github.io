/*!
* Start Bootstrap - The Big Picture v5.0.5 (https://startbootstrap.com/template/the-big-picture)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-the-big-picture/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

/******************************************* GENERATING EXERCISE **************************************************/
let start_num
let subtractor
let answers
let answer_index
let difficulty
let numUp = document.getElementById("num-Up")
let numDown = document.getElementById("num-Down")
let input_field = document.getElementById("input-number")

    input_field.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === 'Space') {
            check_answer()
        }
    });

/* Returns a random number
* Level 1: numbers between 25-50
* Level 2: numbers between 50-100
* Level 3: numbers between 75-150
* and so on...*/
function start_num_generator(difficulty = 1){
    return 25*difficulty + Math.floor(Math.random()*100%(25*difficulty))
}

/* Returns a random number between 2 - 9
* Level 1: between 2-5
* Level 2: between 4-7
* Level 3: between 6-9
* and so on...*/
function subtractor_generator(difficulty = 1){
    return 2*difficulty + Math.floor(Math.random()*100%4)
}

/* Returns an array with the answers of all the subtractions*/
function answer_generator(start_num, subtractor){
    let answers = Array()
    answers[0] = start_num
    for (let i=0; i< Math.floor(start_num/subtractor); i++){
        answers.push(answers[i] - subtractor)
    }
    return answers
}

/* clears the input field */
function clear_input(){
    input_field.value = ""
}

/* Change the numbers shown on screen and clear input field */
function update_screen(input = 0){
    numUp.innerHTML = numDown.textContent
    numDown.innerHTML = input
    clear_input()
    input_field.focus()
}

/* Takes the value of the input tag id='input-number'
* compares the value with the current place in the answers index
* if correct: update screen with the new input and increase the index
* if incorrect: show a message on screen*/
function check_answer(){
    let input = parseInt(input_field.value)

    if (input === answers[answer_index+1]){ // Correct Answer
        update_screen(input)
        answer_index += 1

        /*
        * if its the last answer, win the game, stop the clock
        * */
    }else{ // Incorrect answer
        clear_input()
        console.log("incorrect")
    }

}

/* Sets up all the variables with the numbers of the exercise
* activates the stopwatch*/
function start_game(difficult = 1){
    start_num = start_num_generator(difficulty)
    subtractor = subtractor_generator(difficulty)
    answers = answer_generator(start_num, subtractor)
    answer_index = 0
    update_screen(start_num)
    difficulty = difficult

    console.log("Start Number: " + start_num +
        "\nSubtractor: " + subtractor +
        "\nAnswers: \n")
    for( let i=0; i<answers.length; i++) {
        /* wait for input
        * verify answer
        * update start number
        * */
        console.log(answers[i] + "\n")
    }
}

/******************************** CRONOMETRO ***************************************************/

let [milliseconds,second,minute,] = [0,0,0];
let timerRef = document.querySelector('.mainTime');
let int = null;

/* Start Button */
document.getElementById('start').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(mainTime,10);
});

/* Reset Button */
document.getElementById('reset').addEventListener('click', ()=>{
    clearInterval(int);
    [milliseconds,seconds,minutes,hours] = [0,0,0];
    timerRef.innerHTML = '00 : 00 : 00';
});

/* Stop Button */
document.getElementById('stop').addEventListener('click', ()=>{
    clearInterval(int);
});

/* Main Function */
function mainTime(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        second++;
        if(second == 60){
            second = 0;
            minute++;
            if(minute == 60){
                minute = 0;
            }
        }
    }
    let m = minute < 10 ? "0" + minute : minute;
    let s = second < 10 ? "0" + second : second;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    timerRef.innerHTML = ` ${m} : ${s} : ${ms}`;
}

/**************************************** FIN CONOMETRO ************************************************************/

