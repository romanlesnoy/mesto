import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {popupEditProfile,
        openEditProfilePopupButton,
        formEditProfile,
        currentProfileName,
        currentAboutMe,
        inputProfileName,
        inputAboutMe,
        popupAddCard,
        formAddCard,
        openAddCardPopupButton,
        initialCards,
        template,
        elements,
        popupOpenImage,
        validationElements} from '../utils/constants.js';

//валидация форм 
const popupEditProfileValidator = new FormValidator(validationElements, formEditProfile);

const popupAddCardValidator = new FormValidator(validationElements, formAddCard);

const imagePopup = new PopupWithImage (popupOpenImage);//попап фото карточки

//создание карточки и добавление ее на страницу  
const addCard = (data) => {
    const card = new Card(data, template, (name, link) => {imagePopup.open(name, link)});
    cardList.addItem (card.getCard());
}

//создание секций с карточками
const cardList = new Section ({
    items: initialCards.reverse(),
    renderer: (item) => {addCard (item)},
}, elements)

cardList.render();

const addCardPopupForm = new PopupWithForm (popupAddCard, ({cardname, imagelink}) => {addCard({name: cardname, link: imagelink})}); //попап формы карточки

const editProfilePopupForm = new PopupWithForm (popupEditProfile, ({profilename, job}) => {userInfo.setUserInfo({profilename, job})}); //попап формы информации профиля

const userInfo = new UserInfo (currentProfileName, currentAboutMe);// объект с информацией пользователя 

//функция открывающая попап редактирофания профиля и заполняющая форму текущими значениями профиля 
const addProfileInfo = () => {
    const currentInfo = userInfo.getUserInfo();
    inputProfileName.value = currentInfo.name;
    inputAboutMe.value = currentInfo.job;
    popupEditProfileValidator.enableValidation();
    editProfilePopupForm.open();
}

const openAddCardPopup = () => {
    popupAddCardValidator.enableValidation();
    addCardPopupForm.open()
}

openAddCardPopupButton.addEventListener('click', openAddCardPopup);//обработчик кнопки добавления карточки
openEditProfilePopupButton.addEventListener('click', addProfileInfo);//обработчик кнопки редактирования профиля 
imagePopup.setEventListeners();
addCardPopupForm.setEventListeners();
editProfilePopupForm.setEventListeners();