import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor (popup, callBackFunction) {
        super(popup);
        this.poupForm = this._popup.querySelector('.popup__form');
        this.inputFields = Array.from(this.poupForm.querySelectorAll('.popup__input-field'));
        this.callBackFunction = callBackFunction;
    }

    _getInputValues () {
        this._inputValues = {};
        this.inputFields.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    _submitHandler () {
        event.preventDefault();
        this.callBackFunction(this._getInputValues ());
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this.poupForm.addEventListener('submit', this._submitHandler.bind(this));
    }
    
    close() {
        super.close();
        this.poupForm.reset();
    } 
}
