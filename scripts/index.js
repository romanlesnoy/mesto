//Переменные popup редактирования профиля
let popupEditProfile = document.querySelector('.popup_profile-edit');
let openEditProfilePopupButton = document.querySelector('.profile__edit-btn');
let closeEditProfilePopupButton = popupEditProfile.querySelector('.popup__close-btn');
let formEditProfile = popupEditProfile.querySelector('.popup__form');

//Переменные popup добавления карточки
let popupAddCard = document.querySelector('.popup_add-card');
let openAddCardPopupButton = document.querySelector('.profile__add-btn');
let closeAddCardPopupButton = popupAddCard.querySelector('.popup__close-btn');

//Значения профиля
let currentProfileName = document.querySelector('.profile__name');
let currentAboutMe = document.querySelector('.profile__about-me');

//Значения инпута popup редактирования профиля
let inputProfileName = popupEditProfile.querySelector('.popup__input-name');
let inputAboutMe = popupEditProfile.querySelector('.popup__input-about-me');

//Функция открытия popup редактирования профиля 
function popupEditProfileToggle () {
    if (popupEditProfile.classList.contains('popup_opened') === false) {
        inputProfileName.value = currentProfileName.textContent;
        inputAboutMe.value = currentAboutMe.textContent;
    }
    popupEditProfile.classList.toggle('popup_opened'); 
}

//Функция сохранения данных инпута в профиль
function formSubmitHandler (evt) {
    evt.preventDefault();
    currentProfileName.textContent = inputProfileName.value;
    currentAboutMe.textContent = inputAboutMe.value;
    popupEditProfileToggle(); 
}

//Функция открытия popup добавления карточки
function popupAddCardToggle () {
    popupAddCard.classList.toggle('popup_opened'); 
}

//Обработчики событий popup редактирования профиля
openEditProfilePopupButton.addEventListener ('click', popupEditProfileToggle);
closeEditProfilePopupButton.addEventListener ('click', popupEditProfileToggle);
formEditProfile.addEventListener('submit', formSubmitHandler); 

//Обработчики событий popup добавления карточки
openAddCardPopupButton.addEventListener('click', popupAddCardToggle);
closeAddCardPopupButton.addEventListener ('click', popupAddCardToggle);

