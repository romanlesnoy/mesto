const parametersValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input-field_state_invalid'
}

function showError(formElement, input){
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(parametersValidation.inputErrorClass);
    
}

function hideError(formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = " ";
    input.classList.remove(parametersValidation.inputErrorClass);
}

function checkInputValidity(formElement, input) {
    if (input.checkValidity()) {
        hideError (formElement, input);
    } else {
        showError(formElement, input);
    }
};

function toggleButtonState(formElement, buttonElement) {
    if (formElement.checkValidity()) {
        buttonElement.classList.remove(parametersValidation.inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(parametersValidation.inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

function setEventListeners(formElement) {
    const inputElements = Array.from(formElement.querySelectorAll(parametersValidation.inputSelector));
    const buttonElement = formElement.querySelector(parametersValidation.submitButtonSelector);

    inputElements.forEach((input) => {
        input.addEventListener ('input', (event) => {
            checkInputValidity(formElement, event.target);
            toggleButtonState(formElement, buttonElement);
        });
    });

    toggleButtonState(formElement, buttonElement);
}

function enableValidation() {
    const formElements = Array.from(document.querySelectorAll(parametersValidation.formSelector));

    formElements.forEach( (form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        setEventListeners (form);
    })
}

enableValidation(parametersValidation);