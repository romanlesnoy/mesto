//Переменные popup редактирования профиля
const popupEditProfile = document.querySelector('.popup__profile-edit');
const openEditProfilePopupButton = document.querySelector('.profile__edit-btn');
const closeEditProfilePopupButton = popupEditProfile.querySelector('.popup__close-btn');
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
const closeAddCardPopupButton = popupAddCard.querySelector('.popup__close-btn');
const formAddCard= popupAddCard.querySelector('.popup__form');

//Попап открытие картинки
const popupOpenImage = document.querySelector('.popup__image-preview');
const popupOpenImageCloseButton = popupOpenImage.querySelector('.popup__close-btn');

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

const elements = document.querySelector('.elements'); // секция с карточками
const addButton = popupAddCard.querySelector('.popup__save-btn'); // кнопка добавления карточек
const cardName = popupAddCard.querySelector('.popup__input-card-name'); // инпут названия карточки
const cardImageLink = popupAddCard.querySelector('.popup__input-image-link'); // инпут ссылки на изображение
const template = document.querySelector('.template'); // загатовка карточки

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

//Функция открытия popup добавления карточки
function popupAddCardToggle () {
    popupAddCard.classList.toggle('popup_opened'); 
}

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

//удаление карточки
const handlerRemove = (event) => {
    event.target.closest('.elements__figure').remove();
};

//лайк карточки
const likeFunction = (event) => {
    event.target.classList.toggle('elements__like-btn_active');
}

//открытие закрытие попапа картинки
const popupOpenImageToggle = () => {
    popupOpenImage.classList.toggle('popup_opened')
}


//создание карточки
const getCard = (data) => {
    const card = template.content.cloneNode(true);
    const cardImage = card.querySelector('.elements__image');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    card.querySelector('.elements__caption').textContent = data.name;

    const removeButton = card.querySelector('.elements__remove-btn');
    const likeButton =  card.querySelector('.elements__like-btn');

    likeButton.addEventListener('click', likeFunction);//лайк
    removeButton.addEventListener('click', handlerRemove);//удаление
    cardImage.addEventListener('click', () => {
        popupImage.src = data.link;
        popupImage.alt = data.name;
        popupCaption.textContent = data.name;
        popupOpenImageToggle();
    });
    return card
}

//заполнение карточками из массива
const renderList = () => {
    const items = initialCards.map(element => getCard(element));
    elements.append(...items)
};

//Получение данных о карточке из формыб отображение карточки
addButton.addEventListener('click', (event) => {
        event.preventDefault();
        const item = getCard({
            name: cardName.value,
            link: cardImageLink.value
        });
        elements.prepend(item);
        cardName.value = '';
        cardImageLink.value = '';
        popupAddCardToggle (); 
});

//Обработчики событий popup редактирования профиля
openEditProfilePopupButton.addEventListener ('click', popupEditProfileToggle);
closeEditProfilePopupButton.addEventListener ('click', popupEditProfileToggle);
formEditProfile.addEventListener('submit', formSubmitHandler); 

//Обработчики событий popup добавления карточки
openAddCardPopupButton.addEventListener('click', popupAddCardToggle);
closeAddCardPopupButton.addEventListener ('click', popupAddCardToggle);

//обработчики событий загрузки карточек вместе со страницей, кнопка закрытия попапа карточки
popupOpenImageCloseButton.addEventListener('click', popupOpenImageToggle);
window.onload = renderList();

