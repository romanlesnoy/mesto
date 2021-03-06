export class FormValidator {
    constructor (settings, form) {
        this._form = form;
        this._inputElements = Array.from(form.querySelectorAll(settings.inputSelector));
        this._submitButton = form.querySelector(settings.submitButtonSelector);
        this._inactiveButtonStatus = settings.inactiveButtonClass;
        this._inputError = settings.inputErrorClass;
    }

    _showError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputError);
    }
    
    _hideError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = " ";
        inputElement.classList.remove(this._inputError);
    }

    _checkInputValidity(inputElement) {
        if (inputElement.checkValidity()) {
            this._hideError (inputElement);
        } else {
            this._showError(inputElement);
        }
    }

    toggleButtonState() {
        if (this._form.checkValidity()) {
            this._submitButton.classList.remove(this._inactiveButtonStatus);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._inactiveButtonStatus);
            this._submitButton.disabled = true;
        }
    }

    resetErrorMessage() {
        this._inputElements.forEach((inputElement) => {
            this._hideError(inputElement);
        })
    }

    _setEventListeners() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._inputElements.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
    

    enableValidation() {
        this._setEventListeners();
    }
}
