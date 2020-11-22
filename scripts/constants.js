//Переменные popup редактирования профиля
export const popupEditProfile = document.querySelector('.popup__profile-edit');
export const openEditProfilePopupButton = document.querySelector('.profile__edit-btn');
export const formEditProfile = popupEditProfile.querySelector('.popup__form');

//Значения профиля
export const currentProfileName = document.querySelector('.profile__name');
export const currentAboutMe = document.querySelector('.profile__about-me');

//Значения инпута popup редактирования профиля
export const inputProfileName = popupEditProfile.querySelector('.popup__input-name');
export const inputAboutMe = popupEditProfile.querySelector('.popup__input-about-me');

//Переменные popup добавления карточки
export const popupAddCard = document.querySelector('.popup__add-card');
export const openAddCardPopupButton = document.querySelector('.profile__add-btn');

//Попап открытие картинки
export const popupOpenImage = document.querySelector('.popup__image-preview');

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

export const elements = document.querySelector('.elements'); // секция с карточками
export const openAddCardButton = document.querySelector('.profile__add-btn');
export const addButton = popupAddCard.querySelector('.popup__save-btn'); // кнопка добавления карточек
export const cardName = popupAddCard.querySelector('.popup__input-card-name'); // инпут названия карточки
export const cardImageLink = popupAddCard.querySelector('.popup__input-image-link'); // инпут ссылки на изображение
export const popupImage = document.querySelector('.popup__image'); //изображение в попапе при отображеении
export const popupCaption = document.querySelector('.popup__image-caption'); // описание изображения при отображении

//Валидация формб объект с селекторами отвечающими за валидацию
export const validationElements = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input-field_state_invalid'
}