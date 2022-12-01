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
        this.screen = this.body.querySelector('#display');
        this.keyboard = this.body.querySelector(".calculator__keyboard");
        this.animationPoint = this.body.querySelector(".calculator__animation-point");
        this.allOperants = /[\/\*\-\+\u221a\^\%]$/;
        this.endsWithOperant = /[\/\*\-\+\u221a\^]+$/;
        this.multiOperantsRegex = /([\/\*\-\+\u221a\^]{2,})([\/\*\-\+\u221a\^]+)/g;
        this.negativeIntRegex = /([\/\*\-\+]{1})(\-)(\d[\\.\d]*)/g;
        this.squereRegex = /(\u221a)(\d[\\.\d]*)/g;
        this.powerRegex = /(\d[\\.\d]*)(\^)(\d[\\.\d]*)/g;
        this.percentRegex1 = /(\d*[\\.\d]*||\(\d*[\\.\d]*\*\*\d*[\\.\d]*\)||\(\d*[\\.\d]*\*\*\(1\/2\)\))([\-\+]+)(\d+[\\.\d]*)(%)/g;
        this.percentRegex2 = /(\d*[\\.\d]*||\(\d*[\\.\d]*\*\*\d*[\\.\d]*\)||\(\d*[\\.\d]*\*\*\(1\/2\)\))([\/\*]+)(\d+[\\.\d]*)(%)/g;
        // ФУНКЦИЯ КАЛЬКУЛЯТОР И ВЫВОД НА ЭКРАН
        this.inputGetter = (i) => {
            if (i.target.value == '=') {
                this.buttons[18].removeAttribute("disabled")
                let str = this.screen.innerText.replaceAll(this.squereRegex, "($2**(1/2))")
                    .replaceAll(this.powerRegex, "($1**$3)")
                    .replace(/^(\d[\\.\d]*)(%)$/, "$1/100")
                    .replaceAll(this.percentRegex1, "$1$2($1*($3/100))")
                    .replaceAll(this.percentRegex2, "($1$2($3/100))")
                    .replaceAll(this.negativeIntRegex, "$1(0-$3)")
                    .replaceAll(this.multiOperantsRegex, "$2");

                try { // ФИНАЛЬНЫЙ РАСЧЁТ                    
                    return this.screen.innerText = 1e10 * (new Function(`return ${str || 0}`))().toFixed(4) / 1e10
                } catch (error) {
                    return this.screen.innerText = "ゴゴゴゴゴゴゴゴゴゴ"
                }

            } else {
                let value = i.target.value.replace("x^", "^").replace("√x", "√").replace("X", "*")
                let lastValue = this.screen.innerText.slice(-1)

                if (i.target.value == 'AC') {
                    this.buttons[18].removeAttribute("disabled")
                    this.screen.innerText = "0"
                } else if (lastValue === "0" && value === ".") {
                    this.screen.innerText += value
                } else if (lastValue !== value && value === ".") {                    
                    this.buttons[18].setAttribute("disabled", true)                   
                    Number.isFinite(+lastValue) ? this.screen.innerText += value : this.screen.innerText += "0.";
                } else if (lastValue === "." && value === ".") {
                    this.buttons[18].setAttribute("disabled", true)
                } else if (this.screen.innerText === "0") {
                    this.screen.innerText = value
                } else if (this.allOperants.test(value)) {                   
                    this.buttons[18].removeAttribute("disabled")
                    if (value === "-" && this.screen.innerText.match(this.endsWithOperant)?.[0].length < 2) {
                        this.screen.innerText += value
                    } else if (value === "+" && lastValue === "+") {
                        
                    } else {
                        this.screen.innerText += value
                    }
                } else {
                    this.screen.innerText += value
                }
            }
        };
        // ИЗМЕНЕНИЕ РАЗМЕРА ШРИФТА НА ЭКРАНЕ, АНИМАЦИЯ ПРИ ЛОЖНОМ ОТВЕТЕ
        this.resultChecker = () => {
            this.screen.innerText.length > 17 ? this.screen.style.fontSize = "20px" : this.screen.style.fontSize = "25px";
            // ВЫЗОВ СТЭНДА
            if (this.screen.innerText == "ゴゴゴゴゴゴゴゴゴゴ") {
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
                button.id == "equals" && button.addEventListener("click", () => { thisFix.resultChecker() });
            }
        }
    }
}
