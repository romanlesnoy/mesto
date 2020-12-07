export class Card {
    constructor ({name, link, likes, owner}, ownerId, templateSelector, openImagePreview) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._id = owner._id;
        this._ownerId = ownerId;
        this._template = document.querySelector(templateSelector).content.querySelector('.elements__figure');
        this._openImagePreview = openImagePreview;

    }

    getCard () {
        this._card = this._template.cloneNode(true);
        this._cardImage = this._card.querySelector('.elements__image');
        this._cardImageCaption = this._card.querySelector('.elements__caption');
        this._cardLikeButton = this._card.querySelector('.elements__like-btn');
        this._cardLikeCounter = this._card.querySelector('.elements__like-counter');
        this._cardDeleteButton = this._card.querySelector('.elements__remove-btn');
        
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardImageCaption.textContent = this._name;
        this._cardLikeCounter.textContent = this._likes.length;

        if (this._id !== this._ownerId) {
            this._cardDeleteButton.classList.add('remove-btn_visibility');
        }

        this._setEventListeners();
        
        return this._card;
    }

    _handlerRemove () {
        this._card.remove();
    }

    _likeFunction () {
        this._cardLikeButton.classList.toggle('elements__like-btn_active');
    }

    _setEventListeners() {
        this._cardDeleteButton.addEventListener('click', () => this._handlerRemove());
        this._cardLikeButton.addEventListener('click', () => this._likeFunction());
        this._cardImage.addEventListener('click', () => this._openImagePreview(this._name, this._link));
    }
}