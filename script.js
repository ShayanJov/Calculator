const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalsButton = document.querySelector('[data-equals]');
const previousTextElement = document.querySelector('[data-previous-operand]');
const currentTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor (previousTextElement, currentTextElement) {
        this.currentTextElement = currentTextElement;
        this.previousTextElement = previousTextElement;
        this.clear();
    }
    
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand === '') {
            this.currentOperand = '0.'
        }
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        if (number === '0' && this.currentOperand === '') {
            return;
        }
        this.currentOperand += number
    }

    chooseOperation(operation) {
        if (this.currentOperand == '') return;
        this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    compute() {
        switch (this.operation) {
            case '/': this.currentOperand = +this.previousOperand / +this.currentOperand; break;
            case '*': this.currentOperand = +this.previousOperand * +this.currentOperand; break;
            case '+': this.currentOperand = +this.previousOperand + +this.currentOperand; break;
            case '-': this.currentOperand = +this.previousOperand - +this.currentOperand; break;
        }
        this.previousOperand = '';
        this.operation = '';
        this.updateDisplay()
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.currentOperand
        this.previousTextElement.innerText = `${this.previousOperand}  ${this.operation}`
    }
}

const calculator = new Calculator(previousTextElement, currentTextElement)

clearButton.addEventListener('click', () => {
    calculator.clear()
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch (event.key) {
        case 'Delete': calculator.clear(); break;
        case 'Backspace': calculator.delete(); break;
        case '+':
        case '-':
        case '*':
        case '/':
            calculator.chooseOperation(event.key); break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            calculator.appendNumber(event.key); break;
        case 'Enter': calculator.compute(); break;

    }
    calculator.updateDisplay();
})