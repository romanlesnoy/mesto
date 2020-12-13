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
popupEditProfileValidator.enableValidation(); 
const popupAddCardValidator = new FormValidator(validationElements, formAddCard);// валидация формы добавления карточки
popupAddCardValidator.enableValidation(); 
const popupUpdateAvatarValidator = new FormValidator(validationElements, formUpdateAvatar);//валидация формы  изменения аватара 
popupUpdateAvatarValidator.enableValidation(); 
const imagePopup = new PopupWithImage (popupOpenImage);//попап картинки
const removeCardPopup = new PopupWithSubmit(popupRemoveCard);//попап подтверждения и удаления карточки

const confirmAndDeleteCard = (id, card) => {//подтверждение и удаление карточки 
    removeCardPopup.setRemove(() => {
        api.removeCard(id)
        .then(() => card.removeCard())
        .then(() => removeCardPopup.close())
        .catch(err => console.log(err))
    })
    removeCardPopup.open();
}

const likeCard = (id, card) => {//запрос на лайк/дизлайк карточки 
    const likeRequest = card.getIsLiked() ? api.dislikeCard(id) : api.likeCard(id);
            likeRequest.then(res => card._likeFunction(res))
            .catch(err => console.log(err));
}

const addCard = (data) => {//создание карточки 
    const card = new Card({    
        ...data, 
        currentUserId: userInfo.getUserId(), 
        template, 
        handleClickCard: () => {imagePopup.open(data)},
        handleRemoveCard: () => {confirmAndDeleteCard(data._id, card)},
        handleLike: () => {likeCard(data._id, card)}
    });
    cardList.addItem (card.getCard());
}

const addCardPopupForm = new PopupWithForm (popupAddCard, (cardData) => {//попап добавления карточки 
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

const editProfilePopupForm = new PopupWithForm (popupEditProfile, ({name, about}) => {//попап редактирования профиля 
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

const updateAvatarPopup = new PopupWithForm (popupUpdateAvatar, ({avatarlink}) => {// попап обновления аватара 
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

Promise.all ([//получение первичных данных с сервера
    api.getUserInformation (),
    api.getCards(),
]).then((values) => {
    const [userData, initialCards] = values;
    userInfo.setUserInfo(userData.name, userData.about, userData._id);
    userInfo.setUserAvatar(userData.avatar);
    const initialCardsReverse = initialCards.reverse();
    initialCardsReverse.forEach(element => {
        addCard(element);
    });
}).catch((err) => {
    console.log(err);
})

//функция открывающая попап редактирофания профиля, заполняющая форму текущими значениями профиля, проверяющая валидацию
const addProfileInfo = () => {
    const currentInfo = userInfo.getUserInfo();
    inputProfileName.value = currentInfo.name;
    inputAboutMe.value = currentInfo.job;
    popupAddCardValidator.toggleButtonState();
    popupEditProfileValidator.resetErrorMessage();
    editProfilePopupForm.open();
}

//функция открывающая попап добавления карточки, проверяющая валидацию
const openAddCardPopup = () => {
    popupAddCardValidator.toggleButtonState();
    popupAddCardValidator.resetErrorMessage();
    addCardPopupForm.open()
}

// функция открывающая попап обновления аватара, проверяющая ошибки валидации 
const openUpdateAvatarPopup = () => {
    popupUpdateAvatarValidator.toggleButtonState();
    popupUpdateAvatarValidator.resetErrorMessage();
    updateAvatarPopup.open();
}

openAddCardPopupButton.addEventListener('click', openAddCardPopup);//обработчик кнопки добавления карточки
openEditProfilePopupButton.addEventListener('click', addProfileInfo);//обработчик кнопки редактирования профиля 
changeAvatarButton.addEventListener('click', openUpdateAvatarPopup);//обработчик кнопки обновления аватара 
imagePopup.setEventListeners();//слушатели попапа картинки
updateAvatarPopup.setEventListeners();//слушатели попапа обновления аватара 
addCardPopupForm.setEventListeners();//слушатели попапа добавления карточки 
editProfilePopupForm.setEventListeners();// слушайтели попапа редактирования профиля 
removeCardPopup.setEventListeners();// слушайтели попапа удаления карточки