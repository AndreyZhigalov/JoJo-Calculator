/* .........................................................
                    JoJo Calculator
                Created by ANDREY ZHIGALOV 
GitHub: https://github.com/AndreyZhigalov/JoJo-Calculator
telegram: https://t.me/ZhigalovAndrey
..........................................................*/

class Calculator {
    constructor(bodyId) {
        this.body = document.querySelector(bodyId);
        this.buttons = this.body.querySelectorAll('.calculator__button');
        this.screen = this.body.querySelector('#screen');
        this.keyboard = this.body.querySelector(".calculator__keyboard");
        this.animationPoint = this.body.querySelector(".calculator__animation-point")
        // ФУНКЦИЯ КАЛЬКУЛЯТОР И ВЫВОД НА ЭКРАН
        this.inputGetter = (i) => {
            if (i.target.value == '=') {
                let str = this.screen.innerText

                while (str.match(/√\d[\.\d]*/)) { // УЧЁТ ВЗЯТИЯ КОРНЯ ИЗ ЧИСЛА
                    let matches = str.match(/√\d[\.\d]*/);
                    let startIndex = matches.index
                    str = str.slice(0, startIndex) + `(${matches[0].substring(1)}**(1/2))` + str.slice(startIndex + matches[0].length);
                }
                while (str.match(/\d[\.\d]*\^\d[\.\d]*/)) { // УЧЁТ ВОЗВЕДЕНИЯ В СТЕПЕНЬ
                    let matches = str.match(/\d[\.\d]*\^\d[\.\d]*/);
                    let startIndex = matches.index
                    str = str.slice(0, startIndex) + `(${matches[0].replace(/\^/gui, "**")})` + str.slice(startIndex + matches[0].length);
                }

                while (str.match(/\d[\.\d]*[\/\*\-\+]*\d*[\.\d]*%/)) { // УЧЁТ ПРОЦЕНТОВ
                    let matches = str.match(/\d[\.\d]*[\/\*\-\+]*\d*[\.\d]*%/);
                    let firstInt = matches[0].match(/\d[\.\d]*/)[0]
                    let percentInt = matches[0].match(/\d[\.\d]*%/)[0].slice(0, -1)
                    let operator = matches[0].match(/[\+\-\/\*]/) &&  matches[0].match(/[\+\-\/\*]/)[0]   
                    let startIndex = matches.index

                    if (!operator && startIndex == 0) {
                        str = `${percentInt / 100}` + str.slice(matches[0].length);
                    } else if (operator && operator.match(/[\+\-]+/)) {
                        str = str.slice(0, startIndex) + firstInt + operator + `${firstInt * (percentInt / 100)}` + str.slice(startIndex + matches[0].length);
                    } else {
                        str = str.slice(0, startIndex) + firstInt + operator + `${percentInt / 100}` + str.slice(startIndex + matches[0].length);
                    }
                }

                while (str.match(/[\/\*\-\+]-\d+/)) { // УЧЁТ ОТРИЦАТЕЛЬНЫХ ЧИСЕЛ
                    let matches = str.match(/[\/\*\-\+]-\d[\.\d]*/);
                    let startIndex = matches.index
                    str = str.slice(0, startIndex) + matches[0][0] + `(${matches[0].substring(1)})` + str.slice(startIndex + matches[0].length);
                }

                try { // ФИНАЛЬНЫЙ РАСЧЁТ                    
                    return this.screen.innerText = (new Function(`return ${str || 0}`))()                        
                } catch (error) {
                    return this.screen.innerText = "ゴゴゴゴゴゴゴゴゴゴ"
                }

            } else if (i.target.value == 'AC') {
                this.screen.innerText = ""
            } else if (i.target.value == 'x^') {
                this.screen.innerText += "^";
            } else if (i.target.value == '√x') {
                this.screen.innerText += "√";
            } else if (i.target.value == 'X') {
                this.screen.innerText += "*";
            }
            else {
                this.screen.innerText += i.target.value;
            }
        };
        // ИЗМЕНЕНИЕ РАЗМЕРА ШРИФТА НА ЭКРАНЕ, АНИМАЦИЯ ПРИ ЛОЖНОМ ОТВЕТЕ
        this.resultChecker = () => {
            this.screen.innerText.length > 17 ? this.screen.style.fontSize = "20px" : this.screen.style.fontSize = "25px";
            // ВЫЗОВ СТЭНДА
            if (this.screen.innerText == "ゴゴゴゴゴゴゴゴゴゴ" ) {
                this.animationPoint.classList.add("wrongResult");
                this.keyboard.classList.add("standMessageWrong")

                setTimeout(() => {
                    this.animationPoint.classList.remove("wrongResult");
                    this.keyboard.classList.remove("standMessageWrong")
                }, 2000);

            } else if (this.screen.innerText == "Infinity") {
                this.screen.innerText = "Бесконечность"
                this.animationPoint.classList.add("infinity")
                this.keyboard.classList.add("standMessageInfinity")

                setTimeout(() => {
                    this.animationPoint.classList.remove("infinity")
                    this.keyboard.classList.remove("standMessageInfinity")
                }, 2000);
            }
        };
        // ОТСЛЕЖИВАНИЕ НАЖАТИЙ КНОПОК
        this.turnOn = () => {
            let thisFix = this;
            for (let button of this.buttons) {
                button.addEventListener("click", (value) => { thisFix.inputGetter(value) });
                button.id == "equal" && button.addEventListener("click", () => { thisFix.resultChecker() });
            }
        }
    }
}
