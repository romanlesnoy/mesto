import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor (popup, callBackFunction) {
        super(popup);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputFields = Array.from(this._popupForm.querySelectorAll('.popup__input-field'));
        this.callBackFunction = callBackFunction;
    }

    _getInputValues () {
        this._inputValues = {};
        this._inputFields.forEach((input) => {
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
        this._popupForm.addEventListener('submit', this._submitHandler.bind(this));
    }
    
    close() {
        super.close();
        this._popupForm.reset();
    } 
}
