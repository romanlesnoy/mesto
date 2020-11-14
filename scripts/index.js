import { Card } from './card.js';
import { FormValidator } from './formValidator.js'

//Переменные popup редактирования профиля
const popupEditProfile = document.querySelector('.popup__profile-edit');
const openEditProfilePopupButton = document.querySelector('.profile__edit-btn');
const formEditProfile = popupEditProfile.querySelector('.popup__form');

//Значения профиля
const currentProfileName = document.querySelector('.profile__name');
const currentAboutMe = document.querySelector('.profile__about-me');

//Значения инпута popup редактирования профиля
const inputProfileName = popupEditProfile.querySelector('.popup__input-name');
const inputAboutMe = popupEditProfile.querySelector('.popup__input-about-me');

//Переменные popup добавления карточки
const popupAddCard = document.querySelector('.popup__add-card');
const openAddCardPopupButton = document.querySelector('.profile__add-btn');

//Попап открытие картинки
const popupOpenImage = document.querySelector('.popup__image-preview');

//Карточки-зачотовки при загрузке страницы
const initialCards = [
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

const elements = document.querySelector('.elements'); // секция с карточками
const addButton = popupAddCard.querySelector('.popup__save-btn'); // кнопка добавления карточек
const cardName = popupAddCard.querySelector('.popup__input-card-name'); // инпут названия карточки
const cardImageLink = popupAddCard.querySelector('.popup__input-image-link'); // инпут ссылки на изображение
const popupImage = document.querySelector('.popup__image'); //изображение в попапе при отображеении
const popupCaption = document.querySelector('.popup__image-caption'); // описание изображения при отображении

//Открывает переданный попап
function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupsByEsc);
    if (popup.classList.contains('popup__add-card')) {
            addButton.classList.add(validationElements.inactiveButtonClass);
            addButton.disabled = true;
    }
}

//Закрывает переданный попап
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupsByEsc);
}

//Функция открытия popup добавления карточки
function openPopupAddCard () {
    openPopup (popupAddCard);
}

//открытие открытия попапа картинки
function openImagePreview (link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupOpenImage);
}

//Функция проверки содержимого попапа редактирования профиля при открытии 
function openPopupEditProfile () {
    inputProfileName.value = currentProfileName.textContent;
    inputAboutMe.value = currentAboutMe.textContent;
    openPopup (popupEditProfile); 
}

//Функция сохранения данных инпута в профиль
function formSubmitHandler (evt) {
    evt.preventDefault();
    currentProfileName.textContent = inputProfileName.value;
    currentAboutMe.textContent = inputAboutMe.value;
    closePopup (popupEditProfile);
}

//Функция клик на overlay
const onClickPopupOverlay = (event) => {
    if( event.target !==  event.currentTarget) {
        return
    }
    closePopup(event.currentTarget);
}

//Функция закрытия попапов на оверлей и кнопку закрытия
function closePopups () {
    const popups = Array.from(document.querySelectorAll('.popup'));
    popups.forEach((popup) => {
        popup.addEventListener('click', onClickPopupOverlay);

        const closeButtons = Array.from(popup.querySelectorAll('.popup__close-btn'));
        closeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                closePopup(popup);
            });
        })
    })  
}

//Закрытие на ESC
function closePopupsByEsc (event) {
    if (event.key === "Escape"){
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

//создание карточки
const addCard = (data) => {
    const card = new Card(data, '.template', openImagePreview);
    return card.getCard();
}

//заполнение карточками из массива
const renderList = () => {
    const items = initialCards.map(element => addCard(element));
    elements.append(...items)
}

//Получение данных о карточке из формы отображение карточки
addButton.addEventListener('click', (event) => {
        event.preventDefault();
        const item = addCard({
            name: cardName.value,
            link: cardImageLink.value
        });
        elements.prepend(item);
        cardName.value = '';
        cardImageLink.value = '';
        closePopup (event.target.closest('.popup')); 
})

//Валидация формб объект с селекторами отвечающими за валидацию
const validationElements = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disable',
    inputErrorClass: 'popup__input-field_state_invalid'
}

const formList = Array.from(document.querySelectorAll(validationElements.formSelector));

formList.forEach((form) => {
    const formsValidator = new FormValidator(validationElements, form);
    formsValidator.enableValidation();
})

//Обработчики событий popup редактирования профиля
openEditProfilePopupButton.addEventListener ('click', openPopupEditProfile);
openAddCardPopupButton.addEventListener('click', openPopupAddCard);
formEditProfile.addEventListener('submit', formSubmitHandler);

closePopups();
renderList();