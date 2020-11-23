
export const popupEditProfile = document.querySelector('.popup__profile-edit');// попап редактирования профиля
export const openEditProfilePopupButton = document.querySelector('.profile__edit-btn');//кнопка открывающая попап редактирования профиля 
export const currentProfileName = document.querySelector('.profile__name');//текущее значение имени профиля 
export const currentAboutMe = document.querySelector('.profile__about-me');//текущее значение данный "о себе"
export const inputProfileName = popupEditProfile.querySelector('.popup__input-name');//поле ввода имени формы
export const inputAboutMe = popupEditProfile.querySelector('.popup__input-about-me');// поле ввода "о себе" формы

export const popupAddCard = document.querySelector('.popup__add-card');//попап добавления карточки 
export const openAddCardPopupButton = document.querySelector('.profile__add-btn');// кнопка открывающая попап добавления карточки

//Карточки-зачотовки при загрузке страницы
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]

export const elements = document.querySelector('.elements'); //секция заполняемая карточками
export const popupOpenImage = document.querySelector('.popup__image-preview');//попап превью картинки
export const popupImage = document.querySelector('.popup__image'); //изображение в попапе при отображеении
export const popupCaption = document.querySelector('.popup__image-caption'); // описание изображения при отображении

//Объект с селекторами отвечающими за валидацию форм
export const validationElements = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input-field_state_invalid'
}