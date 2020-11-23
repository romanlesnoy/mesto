import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {popupEditProfile,
        openEditProfilePopupButton,
        currentProfileName,
        currentAboutMe,
        inputProfileName,
        inputAboutMe,
        popupAddCard,
        openAddCardPopupButton,
        initialCards,
        elements,
        popupOpenImage,
        popupImage,
        popupCaption,
        validationElements} from '../utils/constants.js';

//валидация форм 
const formList = Array.from(document.querySelectorAll(validationElements.formSelector));
    formList.forEach((form) => {
        const formsValidator = new FormValidator(validationElements, form);
        formsValidator.enableValidation();
})

const ImagePopup = new PopupWithImage (popupOpenImage, popupImage, popupCaption);//попап фото карточки

//создание карточки и добавление ее на страницу  
const addCard = (data) => {
    const card = new Card(data, '.template', (name, link) => {ImagePopup.open(name, link)});
    cardList.addItem (card.getCard());
}

//создание секций с карточками
const cardList = new Section ({
    items: initialCards.reverse(),
    renderer: (item) => {addCard (item)},
}, elements)

cardList.render();

//передача данных формы карточки, для ёё создания и добавления на страницу  
const addCardInfo = ({cardname, imagelink}) => {
    addCard({name: cardname, link: imagelink});
}

const addCardPopupForm = new PopupWithForm (popupAddCard, addCardInfo); //попап формы карточки

const editProfilePopupForm = new PopupWithForm (popupEditProfile, ({profilename, aboutme}) => {userInfo.setUserInfo({profilename, aboutme})}); //попап формы информации профиля

const userInfo = new UserInfo (currentProfileName, currentAboutMe);// объект с информацией пользователя 

//функция открывающая попап редактирофания профиля и заполняющая форму текущими значениями профиля 
const addProfileInfo = () => {
    editProfilePopupForm.open();
    const currentInfo = userInfo.getUserInfo();
    inputProfileName.value = currentInfo.name;
    inputAboutMe.value = currentInfo.aboutme;
}

openAddCardPopupButton.addEventListener('click', () => {addCardPopupForm.open()});//обработчик кнопки добавления карточки
openEditProfilePopupButton.addEventListener('click', addProfileInfo);//обработчик кнопки редактирования профиля 