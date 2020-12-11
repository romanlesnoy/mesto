import './index.css';
import {Api} from '../components/Api.js';
import {popupEditProfile,
    openEditProfilePopupButton,
    formEditProfile,
    curentAvatarSelector,
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
    popupRemoveCard,
    userId,
    template,
    elements,
    popupOpenImage,
    validationElements} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithSubmit} from '../components/PopupWithSubmit.js';
import {UserInfo} from '../components/UserInfo.js';

const api = new Api ({
    token: 'f15df90b-c5d7-4a51-ba9b-c09d4fecf6eb',
    url: 'https://mesto.nomoreparties.co/v1/cohort-18',
});

const cardList = new Section (elements);

const popupEditProfileValidator = new FormValidator(validationElements, formEditProfile);//валидация формы редактирования профиля 
const popupAddCardValidator = new FormValidator(validationElements, formAddCard);// валидация формы добавления карточки
const popupUpdateAvatarValidator = new FormValidator(validationElements, formUpdateAvatar);
const imagePopup = new PopupWithImage (popupOpenImage);
const removeCardPopup = new PopupWithSubmit(popupRemoveCard);

const confirmAndDeleteCard = (id, card) => {
    removeCardPopup.setRemove(() => {
        api.removeCard(id)
        .then(() => {card.removeCard()})
        .then(() => removeCardPopup.close())
        .catch((err) => {console.log(err)})
    })
    removeCardPopup.open();
}

const addCard = (data) => {
    const card = new Card({    
        ...data, 
        currentUserId: userId, 
        template, 
        handleClickCard: () => {imagePopup.open(data)},
        handleRemoveCard: () => {confirmAndDeleteCard(data._id, card)},
        likeCard: (id) => {return api.likeCard(id)},
        dislikeCard: (id) => {return api.dislikeCard(id)}
    });
    cardList.addItem (card.getCard());
}

const addCardPopupForm = new PopupWithForm (popupAddCard, (cardData) => {
    api.addNewCard(cardData)
    .then ((cardData) => {
        addCard(cardData)
    })
    .then (() => {
        addCardPopupForm.close()
    })
    .catch((err) => {
        console.log(err)
    })
});

const editProfilePopupForm = new PopupWithForm (popupEditProfile, ({name, about}) => {
    api.editUserInfo(name, about)
    .then ((res) => {
        userInfo.setUserInfo(res.name, res.about)
    }).then (() => {
        editProfilePopupForm.close()
    })
    .catch((err) => {
        console.log(err)
    })
})

const updateAvatarPopup = new PopupWithForm (popupUpdateAvatar, ({avatarlink}) => {
    api.editUserAvatar(avatarlink)
    .then ((res) => {
        userInfo.setUserAvatar(res.avatar)
    })
    .then (() => {
        updateAvatarPopup.close()
    })
    .catch((err) => {
        console.log(err)
    })
})

const userInfo = new UserInfo (curentAvatarSelector, currentProfileName, currentAboutMe);// объект с информацией пользователя

Promise.all ([
    api.getUserInformation (),
    api.getCards(),
]).then((values) => {
    const [userData, initialCards] = values;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    const initialCardsReverse = initialCards.reverse();
    initialCardsReverse.forEach(element => {
        addCard(element);
    });
}) .catch((err) => {
    console.log(err);
})

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
removeCardPopup.setEventListeners();