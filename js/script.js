/*JoJo Calculator*/ 
const buttons = document.getElementsByClassName('calculator__button');
const screen = document.getElementById('screen');
/* ФУНКЦИЯ КАЛЬКУЛЯТОР И ВЫВОД НА ЭКРАН*/ 
function inputGetter(i) {
 if (i.target.value == '=') {
        let numbers = screen.innerHTML.split(/\/|\*|[+-]|\^|√|%/).map(i => Number(i));
        let operator = screen.innerHTML.split(/[\d\\.]/).join("");
        return operator == "+"? screen.innerHTML = numbers[0] + numbers[1]:
                operator == "-"? screen.innerHTML = numbers[0] - numbers[1]:
                operator == "/"? screen.innerHTML = (numbers[0] / numbers[1]).toFixed(2):
                operator == "*"? screen.innerHTML = (numbers[0] * numbers[1]).toFixed(2):
                operator == "^" && numbers[1] == ""? screen.innerHTML = Math.pow(numbers[0], 2).toFixed(2):
                operator == "^"? screen.innerHTML = Math.pow(numbers[0], numbers[1]).toFixed(2):
                operator == "√" && numbers[0] == ""? screen.innerHTML = Math.pow(numbers[1], (1/2)).toFixed(2):
                operator == "√" && numbers[1] == ""? screen.innerHTML = Math.pow(numbers[0], (1/2)).toFixed(2):
                operator == "√" ? screen.innerHTML = (numbers[0] * Math.pow(numbers[1], 1/2)).toFixed(2):
                operator == "%" && numbers[1] == "" ? screen.innerHTML = (numbers[0] / 100).toFixed(2):
                operator == "%" && numbers[1] != "" ? screen.innerHTML = ((numbers[1]/ 100) * numbers[0]).toFixed(2): false;
                 
    } else if (i.target.value == 'AC') {
        screen.innerHTML = ""
    } else if (i.target.value == 'x^') {
        screen.innerHTML += "^";
    } else if (i.target.value == '√x') {
        screen.innerHTML += "√";
    } else if (i.target.value == 'X') {
        screen.innerHTML += "*";
    }
    else {
        screen.innerHTML += i.target.value;
    }
}
const fontResize = () => screen.innerHTML.length > 17 ? screen.style.fontSize = "20px": screen.style.fontSize = "25px";
/*
ЧЕКЕР КНОПОК
*/ 
for(let i=0 ; i<buttons.length; i++) {
    buttons[i].addEventListener("click", inputGetter)
}
buttons[19].addEventListener("click", fontResize) // проверяет длинну выводимого числа и меняет размер шрифта
