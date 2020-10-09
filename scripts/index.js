//Переменные popup редактирования профиля
let popupEditProfile = document.querySelector('.popup_profile-edit');
let openEditProfilePopupButton = document.querySelector('.profile__edit-btn');
let closeEditProfilePopupButton = popupEditProfile.querySelector('.popup__close-btn');
let formEditProfile = popupEditProfile.querySelector('.popup__form');

//Значения профиля
let currentProfileName = document.querySelector('.profile__name');
let currentAboutMe = document.querySelector('.profile__about-me');

//Значения инпута popup редактирования профиля
let inputProfileName = popupEditProfile.querySelector('.popup__input-name');
let inputAboutMe = popupEditProfile.querySelector('.popup__input-about-me');

//Переменные popup добавления карточки
let popupAddCard = document.querySelector('.popup_add-card');
let openAddCardPopupButton = document.querySelector('.profile__add-btn');
let closeAddCardPopupButton = popupAddCard.querySelector('.popup__close-btn');

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
];

const elements = document.querySelector('.elements');
const addButton = popupAddCard.querySelector('.popup__save-btn');
const cardName = popupAddCard.querySelector('.popup__input-card-name');
const cardImageLink = popupAddCard.querySelector('.popup__input-image-link');
const template = document.querySelector('.template');


const getCards = (data) => {
    const card = template.content.cloneNode(true);
    cardImage = card.querySelector('.elements__image');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    card.querySelector('.elements__caption').textContent = data.name;

    return card
}

const renderList = () => {
    const items = initialCards.map(element => getCards(element));
    elements.append(...items)
};

const bindHandlers = () => {
    addButton.addEventListener('click', () => {
        const item = getCards({
            name: cardName.value,
            link: cardImageLink.value
        });

        list.prepend(item);

        cardName.value = '';
        cardImageLink.value = '';
    });
};

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


renderList();