let openPopupButton = document.querySelector('.profile__edit-btn');
let closePopupButton = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');

let popupAddCard = document.querySelector('.popup_add-card');
let openAddCardPopupButton = document.querySelector('.profile__add-btn');
let closeAddCardPopupButton = popupAddCard.querySelector('.popup__close-btn');

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

function popupAddCardToggle () {
    popupAddCard.classList.toggle('popup_opened'); 
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    currentProfileName.textContent = inputProfileName.value;
    currentAboutMe.textContent = inputAboutMe.value;
    popupToggle(); 
}


openPopupButton.addEventListener ('click', popupToggle);
openAddCardPopupButton.addEventListener('click', popupAddCardToggle);
closePopupButton.addEventListener ('click', popupToggle);
closeAddCardPopupButton.addEventListener('click', popupAddCardToggle);
formElement.addEventListener('submit', formSubmitHandler); 
