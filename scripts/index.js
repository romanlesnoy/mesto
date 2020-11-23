import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import {popupEditProfile,
        openEditProfilePopupButton,
        formEditProfile,
        currentProfileName,
        currentAboutMe,
        inputProfileName,
        inputAboutMe,
        popupAddCard,
        popupOpenImage,
        openAddCardButton,
        initialCards,
        elements,
        addButton,
        cardName,
        cardImageLink,
        popupImage,
        popupCaption,
        validationElements,
        } from './constants.js';


const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
    formList.forEach((form) => {
        const formsValidator = new FormValidator(validationElements, form);
        formsValidator.enableValidation();
})

const ImagePopup = new PopupWithImage (popupOpenImage, popupImage, popupCaption);

//создание карточки
const addCard = (data) => {
    const card = new Card(data, '.template', (name, link) => {ImagePopup.open(name, link)});
    cardList.addItem (card.getCard());
}

const cardList = new Section ({
    items: initialCards.reverse(),
    renderer: (item) => {addCard (item)},
}, elements)

cardList.render();

const addFormCard = ({cardname, imagelink}) => {
    addCard({name: cardname, link: imagelink});
}

const addCardPopupForm = new PopupWithForm (popupAddCard, addFormCard);
const editProfilePopupForm = new PopupWithForm (popupEditProfile, ({profilename, aboutme}) => {userInfo.setUserInfo({profilename, aboutme})});

const userInfo = new UserInfo (currentProfileName, currentAboutMe);

const addProfileInfo = () => {
    editProfilePopupForm.open();
    const currentInfo = userInfo.getUserInfo();
    inputProfileName.value = currentInfo.name;
    inputAboutMe.value = currentInfo.aboutme;
}

openAddCardButton.addEventListener('click', () => {addCardPopupForm.open()});
openEditProfilePopupButton.addEventListener('click', addProfileInfo);



// //Обработчики событий popup редактирования профиля
// openEditProfilePopupButton.addEventListener ('click', openPopupEditProfile);
// //
// formEditProfile.addEventListener('submit', formSubmitHandler);

//closePopups();
// //Функция клик на overlay
// const onClickPopupOverlay = (event) => {
//     if( event.target !==  event.currentTarget) {
//         return
//     }
//     closePopup(event.currentTarget);
// }

// //Функция закрытия попапов на оверлей и кнопку закрытия
// function closePopups () {
//     const popups = Array.from(document.querySelectorAll('.popup'));
//     popups.forEach((popup) => {
//         popup.addEventListener('click', onClickPopupOverlay);

//         const closeButtons = Array.from(popup.querySelectorAll('.popup__close-btn'));
//         closeButtons.forEach((button) => {
//             button.addEventListener('click', (event) => {
//                 closePopup(popup);
//             });
//         })
//     })  
// }

// //Закрытие на ESC
// function closePopupsByEsc (event) {
//     if (event.key === "Escape"){
//         const activePopup = document.querySelector('.popup_opened');
//         closePopup(activePopup);
//     }
// }

//Получение данных о карточке из формы отображение карточки
// addButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         const item = addCard({
//             name: cardName.value,
//             link: cardImageLink.value
//         });
//         elements.prepend(item);
//         cardName.value = '';
//         cardImageLink.value = '';
//         closePopup (event.target.closest('.popup')); 
// })

// //Функция открытия popup добавления карточки
// function openPopupAddCard () {
//     openPopup (popupAddCard);
// }

//Открывает переданный попап
// function openPopup (popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupsByEsc);
//     if (popup.classList.contains('popup__add-card')) {
//             addButton.classList.add(validationElements.inactiveButtonClass);
//             addButton.disabled = true;
//     }
// }

// //Закрывает переданный попап
// function closePopup (popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupsByEsc);
// }



// //Функция проверки содержимого попапа редактирования профиля при открытии 
// function openPopupEditProfile () {
//     inputProfileName.value = currentProfileName.textContent;
//     inputAboutMe.value = currentAboutMe.textContent;
//     openPopup (popupEditProfile); 
// }

// //Функция сохранения данных инпута в профиль
// function formSubmitHandler (evt) {
//     evt.preventDefault();
//     currentProfileName.textContent = inputProfileName.value;
//     currentAboutMe.textContent = inputAboutMe.value;
//     closePopup (popupEditProfile);
// }