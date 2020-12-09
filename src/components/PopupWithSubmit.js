import {Popup} from './Popup.js'

export class PopupWithSubmit extends Popup {
    constructor (popup) {
        super(popup);
    }

    setRemove(submitAction) {
        console.log(submitAction);
        this._handleSubmitCallback = submitAction;
    }

    _submitHandler() {
        event.preventDefault();
        console.log('click');
        console.log(this._handleSubmitCallback);
        this._handleSubmitCallback();
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitHandler.bind(this));
    }
}