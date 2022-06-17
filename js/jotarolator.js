const calculatorCreator = {
     NewCalc(id) {
        const calculator = {
            // ФУНКЦИЯ КАЛЬКУЛЯТОР И ВЫВОД НА ЭКРАН
            inputGetter(i) {
            if (i.target.value == '=') {
                    let numbers = this.screen.innerHTML.split(/\/|\*|[+-]|\^|√|%/).map(i => Number(i));
                    let operator = this.screen.innerHTML.split(/[\d\\.]/).join("");
                    return operator == "+"? this.screen.innerHTML = numbers[0] + numbers[1]:
                            operator == "-"? this.screen.innerHTML = numbers[0] - numbers[1]:
                            operator == "/"? this.screen.innerHTML = (numbers[0] / numbers[1]).toFixed(2):
                            operator == "*"? this.screen.innerHTML = (numbers[0] * numbers[1]).toFixed(2):
                            operator == "^" && numbers[1] == ""? this.screen.innerHTML = Math.pow(numbers[0], 2).toFixed(2):
                            operator == "^"? this.screen.innerHTML = Math.pow(numbers[0], numbers[1]).toFixed(2):
                            operator == "√" && numbers[0] == ""? this.screen.innerHTML = Math.pow(numbers[1], (1/2)).toFixed(2):
                            operator == "√" && numbers[1] == ""? this.screen.innerHTML = Math.pow(numbers[0], (1/2)).toFixed(2):
                            operator == "√" ? this.screen.innerHTML = (numbers[0] * Math.pow(numbers[1], 1/2)).toFixed(2):
                            operator == "%" && numbers[1] == "" ? this.screen.innerHTML = (numbers[0] / 100).toFixed(2):
                            operator == "%" && numbers[1] != "" ? this.screen.innerHTML = ((numbers[1]/ 100) * numbers[0]).toFixed(2): false;
                } else if (i.target.value == 'AC') {
                    this.screen.innerHTML = ""
                } else if (i.target.value == 'x^') {
                    this.screen.innerHTML += "^";
                } else if (i.target.value == '√x') {
                    this.screen.innerHTML += "√";
                } else if (i.target.value == 'X') {
                    this.screen.innerHTML += "*";
                }
                else {
                    this.screen.innerHTML += i.target.value;
                }
            },
            // ИЗМЕНЕНИЕ РАЗМЕРА ШРИФТА НА ЭКРАНЕ, АНИМАЦИЯ ПРИ ЛОЖНОМ ОТВЕТЕ
            resultChecker() {
                this.screen.innerHTML.length > 17 ? this.screen.style.fontSize = "20px": this.screen.style.fontSize = "25px";
                // ВЫЗОВ СТЭНДА
                let mainClass = this.body.className;
                let mainClass2 = this.keyboard.className;
                if (this.screen.innerHTML == "NaN") {
                    this.screen.innerHTML = "ゴゴゴゴゴゴゴゴゴゴ"
                    this.body.setAttribute("class", mainClass + " wrongResult");
                    this.keyboard.setAttribute("class", mainClass2 + " standMessageWrong")
                    window.setTimeout(() => {
                        this.body.setAttribute("class", mainClass);
                        this.keyboard.setAttribute("class", mainClass2)
                    }, 2000); 
                } else if (this.screen.innerHTML == "Infinity") {
                    this.body.setAttribute("class", mainClass + " infinity")
                    this.keyboard.setAttribute("class", mainClass2 + " standMessageInfinity")
                    window.setTimeout(() => {
                        this.body.setAttribute("class", mainClass)
                        this.keyboard.setAttribute("class", mainClass2)
                    }, 2000); 
                }
            },
            // ОТСЛЕЖИВАНИЕ НАЖАТИЙ КНОПОК
            turnOn(bodyId) {
                this.body = document.querySelector(bodyId);
                this.buttons = this.body.querySelectorAll('.calculator__button');
                this.screen = this.body.querySelector('#screen');
                this.keyboard = this.body.querySelector(".calculator__keyboard");
                let thisFix = this;
                for(let i=0 ; i<this.buttons.length; i++) {
                    this.buttons[i].addEventListener("click", function(i) {thisFix.inputGetter(i)});
                    this.buttons[i].id == "equal"? this.buttons[i].addEventListener("click", function(i) {thisFix.resultChecker(i)}): false;
                }
            }
        }
        calculator.turnOn(id)
        return calculator
    }
}
    
