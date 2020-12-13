export const popupEditProfile = document.querySelector('.popup__profile-edit');// попап редактирования профиля
export const openEditProfilePopupButton = document.querySelector('.profile__edit-btn');//кнопка открывающая попап редактирования профиля 
export const formEditProfile = popupEditProfile.querySelector('.popup__form');
export const curentAvatarSelector = document.querySelector('.profile__avatar');
export const currentProfileName = document.querySelector('.profile__name');//текущее значение имени профиля 
export const currentAboutMe = document.querySelector('.profile__about-me');//текущее значение данный "о себе"
export const inputProfileName = popupEditProfile.querySelector('.popup__input-name');//поле ввода имени формы
export const inputAboutMe = popupEditProfile.querySelector('.popup__input-about-me');// поле ввода "о себе" формы

export const popupAddCard = document.querySelector('.popup__add-card');//попап добавления карточки 
export const formAddCard= popupAddCard.querySelector('.popup__form');//
export const openAddCardPopupButton = document.querySelector('.profile__add-btn');// кнопка открывающая попап добавления карточки

export const popupUpdateAvatar = document.querySelector('.popup__avatar-update');
export const formUpdateAvatar = popupUpdateAvatar.querySelector('.popup__form');
export const changeAvatarButton = document.querySelector('.profile__change-avatar-btn');

export const popupRemoveCard = document.querySelector('.popup__remove-card');

export const template = '.template'; //template
export const elements = document.querySelector('.elements'); //секция заполняемая карточками
export const popupOpenImage = document.querySelector('.popup__image-preview');//попап превью картинки

//Объект с селекторами отвечающими за валидацию форм
export const validationElements = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input-field_state_invalid'
}