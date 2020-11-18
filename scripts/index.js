import {Card} from './card.js';
import {FormValidator} from './formValidator.js';
import {Section} from './Section.js';
import {popupEditProfile,
        openEditProfilePopupButton,
        formEditProfile,
        currentProfileName,
        currentAboutMe,
        inputProfileName,
        inputAboutMe,
        popupAddCard,
        openAddCardPopupButton,
        popupOpenImage,
        initialCards,
        elements,
        addButton,
        cardName,
        cardImageLink,
        popupImage,
        popupCaption,
        validationElements,
        } from './constants.js'


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
    cardList.addItem (card.getCard());
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

const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
formList.forEach((form) => {
    const formsValidator = new FormValidator(validationElements, form);
    formsValidator.enableValidation();
})

const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {addCard (item)},
}, elements)

cardList.render();

//Обработчики событий popup редактирования профиля
openEditProfilePopupButton.addEventListener ('click', openPopupEditProfile);
openAddCardPopupButton.addEventListener('click', openPopupAddCard);
formEditProfile.addEventListener('submit', formSubmitHandler);

closePopups();