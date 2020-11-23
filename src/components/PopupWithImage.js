import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor (popup, popupImage, popupCaption) {
        super(popup);
        this._popupImage = popupImage;
        this._popupCaption = popupCaption;
    }

    open (name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }
}