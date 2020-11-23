export class Card {
    constructor (data, templateSelector, openImagePreview) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(templateSelector).content.querySelector('.elements__figure');
        this._openImagePreview = openImagePreview;
    }

    getCard () {
        this._card = this._template.cloneNode(true);
        
        this._card.querySelector('.elements__image').src = this._link;
        this._card.querySelector('.elements__image').alt = this._name;
        this._card.querySelector('.elements__caption').textContent = this._name;

        this._setEventLiseners();

        return this._card;
    }

    _handlerRemove () {
        this._card.remove();
    }

    _likeFunction () {
        this._card.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_active');
    }

    _setEventLiseners() {
        this._card.querySelector('.elements__remove-btn').addEventListener('click', () => this._handlerRemove());
        this._card.querySelector('.elements__like-btn').addEventListener('click', () => this._likeFunction());
        this._card.querySelector('.elements__image').addEventListener('click', () => this._openImagePreview(this._name, this._link));
    }
}