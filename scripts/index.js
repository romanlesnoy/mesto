let openPopupButton = document.querySelector('.profile__edit-btn');
let closePopupButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');

let currentProfileName = document.querySelector('.profile__name');
let currentAboutMe = document.querySelector('.profile__about-me');

let inputProfileName = document.querySelector('.popup__input-name');
let inputAboutMe = document.querySelector('.popup__input-about-me');

let formElement = document.querySelector('.popup__form');

function popupToggle () {
    if (popup.classList.contains('popup_opened') === false) {
        inputProfileName.value = currentProfileName.textContent;
        inputAboutMe.value = currentAboutMe.textContent;
    }
    popup.classList.toggle('popup_opened'); 
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    currentProfileName.textContent = inputProfileName.value;
    currentAboutMe.textContent = inputAboutMe.value;
    popupToggle(); 
}


openPopupButton.addEventListener ('click', popupToggle);
closePopupButton.addEventListener ('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler); 
