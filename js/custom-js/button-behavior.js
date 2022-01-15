// Button response on click
function correct(button){
    button.classList.remove("btn-primary");
    button.classList.add("btn-success");
    button.innerText = "Correct!";
}

function incorrect(button){
    button.classList.remove("btn-primary");
    button.classList.add("btn-danger");
    button.innerText = "Incorrect!";
}

function both(button){
    button.classList.remove("btn-primary");
    button.classList.add("btn-success");
    button.innerText = "Both are Correct!";
}

