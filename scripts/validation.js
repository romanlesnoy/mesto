function showError(formElement, input){
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add('popup__input-field_state_invalid');
    
}

function hideError(formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = " ";
    input.classList.remove('popup__input-field_state_invalid');
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
        buttonElement.classList.remove('popup__save-btn_disable');
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add('popup__save-btn_disable');
        buttonElement.disabled = true;
    }
}

function setEventListeners(formElement) {
    let inputElements = Array.from(formElement.querySelectorAll(validationElementsObject.inputSelector));
    let buttonElement = formElement.querySelector(validationElementsObject.submitButtonSelector);

    inputElements.forEach((input) => {
        input.addEventListener ('input', () => {
            checkInputValidity(formElement, event.target);
            toggleButtonState(formElement, buttonElement);
        });
    });

    toggleButtonState(formElement, buttonElement);
}

function enableValidation(validationElementsObject) {
    const formElements = Array.from(document.querySelectorAll(validationElementsObject.formSelector));
    console.log(formElements);

    formElements.forEach( form => {
        form.addEventListener('submit', () => {
            event.preventDefault();
        });

        setEventListeners (validationElementsObject);
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input-field_state_invalid',
});