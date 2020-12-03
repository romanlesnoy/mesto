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
        popupUpdateAvatar,
        formUpdateAvatar,
        changeAvatarButton,
        initialCards,
        template,
        elements,
        popupOpenImage,
        validationElements} from '../utils/constants.js';

const popupEditProfileValidator = new FormValidator(validationElements, formEditProfile);//валидация формы редактирования профиля 
const popupAddCardValidator = new FormValidator(validationElements, formAddCard);// валидация формы добавления карточки
const popupUpdateAvatarValidator = new FormValidator(validationElements, formUpdateAvatar);

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

const testSubmitAvatar = (data) => {
    console.log(data);
}
const addCardPopupForm = new PopupWithForm (popupAddCard, ({cardname, imagelink}) => {addCard({name: cardname, link: imagelink})}); //попап формы карточки
const editProfilePopupForm = new PopupWithForm (popupEditProfile, ({profilename, job}) => {userInfo.setUserInfo({profilename, job})}); //попап формы информации профиля
const updateAvatarPopup = new PopupWithForm (popupUpdateAvatar, (avatarlink) => {testSubmitAvatar({avatarlink})});
const userInfo = new UserInfo (currentProfileName, currentAboutMe);// объект с информацией пользователя 

//функция открывающая попап редактирофания профиля, заполняющая форму текущими значениями профиля, проверяющая валидацию
const addProfileInfo = () => {
    const currentInfo = userInfo.getUserInfo();
    inputProfileName.value = currentInfo.name;
    inputAboutMe.value = currentInfo.job;
    popupEditProfileValidator.enableValidation();
    editProfilePopupForm.open();
}

//функция открывающая попап добавления карточки, проверяющая валидацию
const openAddCardPopup = () => {
    popupAddCardValidator.enableValidation();
    addCardPopupForm.open()
}

const openUpdateAvatarPopup = () => {
    popupUpdateAvatarValidator.enableValidation();
    updateAvatarPopup.open();
}

openAddCardPopupButton.addEventListener('click', openAddCardPopup);//обработчик кнопки добавления карточки
openEditProfilePopupButton.addEventListener('click', addProfileInfo);//обработчик кнопки редактирования профиля 
changeAvatarButton.addEventListener('click', openUpdateAvatarPopup);
imagePopup.setEventListeners();
updateAvatarPopup.setEventListeners();
addCardPopupForm.setEventListeners();
editProfilePopupForm.setEventListeners();