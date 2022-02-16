class Calculator {
    constructor(previousElementTextArea, currentElementTextArea) {
        this.previousElementTextArea = previousElementTextArea;
        this.currentElementTextArea = currentElementTextArea;
        this.previousElement = "";
        this.currentElement = "";
    }

    clear( ) {
        this.currentElement = "";
        this.previousElement = "";
        this.operation = undefined;
    }

    delete( ) {
        this.currentElement = this.currentElement.toString().slice(0, -1);
        console.log(this.currentElement);
    }

    appendNumber(num) {
        if(num === '.' && this.currentElement.includes('.')) return ;
        this.currentElement = this.currentElement.toString() + num;
    }

    chooseOperation(op) {
        if(this.operation === undefined) {
            this.operation = op;
            if(this.previousElement !== "") {
                this.compute();
            }
        } else {
            this.nextoperation = op;
            this.compute();
            this.operation = this.nextoperation;
            this.nextoperation = undefined;
        }
        this.previousElement = this.currentElement;
        this.currentElement = "";
    }

    getFormatNumber(n) {
        let strNum = n.toString();
        let intNum = parseFloat(strNum.split('.')[0]);
        let deciNum = strNum.split('.')[1];
        let intDisp;
        if(isNaN(intNum)) {
            intDisp = "";
        } else {
            intDisp = intNum.toLocaleString("en", {maximumFractionDigits:0});
        }
        if(deciNum !== undefined) {
            return `${intDisp}.${deciNum}`;
        } else {
            return intDisp;
        }
    }

    updateDisplay( ) {
        this.currentElementTextArea.textContent = this.getFormatNumber(this.currentElement);
        if(this.operation !== undefined) {
            this.previousElementTextArea.textContent = 
              `${this.getFormatNumber(this.previousElement)} ${this.operation}`;
        } else {
            this.previousElementTextArea.textContent = this.previousElement;
        }
    }

    compute( ) {
        let computation
        let prev = parseFloat(this.previousElement);
        let curr = parseFloat(this.currentElement);
        if(prev !== NaN || curr !== NaN) {
            switch(this.operation) {
                case '+':
                    computation = prev + curr;
                    break;
                case '-':
                    computation = prev - curr;
                    break;
                case '*':
                    computation = prev * curr;
                    break;
                case '/':
                    computation = prev / curr;
                    break;
                default:
                    return ;
            }
            this.currentElement = computation;
            this.operation = undefined;
            this.previousElement = "";
        } 
    }

}
const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousElementTextArea = document.querySelector("[data-previous]");
const currentElementTextArea = document.querySelector("[data-current]");

const calculator = new Calculator(previousElementTextArea, currentElementTextArea);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});