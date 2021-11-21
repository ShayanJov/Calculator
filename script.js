const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalsButton = document.querySelector('[data-equals]');
const smallerTextElement = document.querySelector('[data-previous-operand]');
const biggerTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor (smallerTextElement, biggerTextElement) {
        this.biggerTextElement = biggerTextElement;
        this.smallerTextElement = smallerTextElement;
        this.clear();
    }
    
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.result = '';
        this.operation = '';
        this.smallerTextElement.innerText = '';
        this.biggerTextElement.innerText = '';
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
        if (this.currentOperand != '' && this.previousOperand != '') {
            this.compute();
            this.operation = operation;
            this.previousOperand = this.result;
            this.currentOperand = '';
            this.result = '';
            return;
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        switch (this.operation) {
            case '/': this.result = +this.previousOperand / +this.currentOperand; break;
            case '*': this.result = +this.previousOperand * +this.currentOperand; break;
            case '+': this.result = +this.previousOperand + +this.currentOperand; break;
            case '-': this.result = +this.previousOperand - +this.currentOperand; break;
        }
        this.updateDisplay()
    }

    updateDisplay() {
        if (this.result === '') this.biggerTextElement.innerText = this.currentOperand
        else {
            this.biggerTextElement.innerText = this.result
            this.smallerTextElement.innerText = `${this.previousOperand}  ${this.operation} ${this.currentOperand}`
        }
        if (this.currentOperand != '' && this.previousOperand == '') this.smallerTextElement.innerText = ''
        if (this.operation != '' && this.currentOperand == '') this.smallerTextElement.innerText = `${this.previousOperand} ${this.operation}`
    }
}

const calculator = new Calculator(smallerTextElement, biggerTextElement)

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