class CalculatorController {
    
    constructor() {
        this._operation = [];
        this._locale = 'pt-br';
        this._displayCalcElement = document.querySelector('#display');
        this._dateElement = document.querySelector('#data');
        this._timeElement = document.querySelector('#hora');

        this._currentDate;
        this.initializa();
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach((event) => {
            element.addEventListener(event, fn, false);
        });
    };

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }
    getLastOperation() {
        return this._operation[this._operation.length - 1]
    }

    setLastOperation(value) {
        this._operation[this._operation.length -1] = value;
    }

    isOperator(value) {
       return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    addOperation(value) {

        if(isNaN(this.getLastOperation())) {
            
            if (this.isOperator(value)) {
                this.setLastOperation(value)
            } else if(isNaN(value)) {
                console.log(value);    
            } else {
                this._operation.push(value);
            }

        } else {
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
        }
        
        console.log(this._operation);
    }

    setError() {
        this.displayCalc = 'Error';       
    }

    execBtn(value) {

        switch(value) {
            case 'ac':
                this.clearAll();
            break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
            break;

            case 'subtracao':
                this.addOperation('-');
            break;

            case 'multiplicacao':
                this.addOperation('*');
            break;

            case 'divisao':
                this.addOperation('/');
            break;

            case 'porcento':
                this.addOperation('%');
            break;

            case 'igual':
            break;

            case 'ponto':
                this.addOperation('.');
            break;

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break;

            default:
                this.setError();
                break;
        }
    }

    initButtonsEvents() {
        const buttons = document.querySelectorAll('#buttons > g, #parts > g');
        buttons.forEach((btn) => {
            this.addEventListenerAll(btn, 'click drag', (event) => {
                const btnValue = btn.className.baseVal.replace('btn-', '');
                this.execBtn(btnValue);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            })
        });
    };

    initializa() {
        this.setDisplayDateTime();
     setInterval( () => {
        this.setDisplayDateTime();
     }),
     1000 

     this.initButtonsEvents();
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._lcale);
    }

    get displayTime() {
        return this._dateElement.innerHTML;
    }

    set displayTime(value) {
        this._dateElement.innerHTML = value;
    }

    get displayDate() {
        return this._timeElement.innerHTML;
    }

    set displayDate(value) {
        this._timeElement.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcElement.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcElement.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }
}