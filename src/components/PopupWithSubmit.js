import {Popup} from './Popup.js'

export class PopupWithSubmit extends Popup {
    constructor (popup) {
        super(popup);
    }

    setRemove(submitAction) {
        this._handleSubmitCallback = submitAction;
    }

    _submitHandler() {
        event.preventDefault();
        this._handleSubmitCallback();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitHandler.bind(this));
    }
}