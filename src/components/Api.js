export class Api {
    constructor({token, url}) {
        this._token = token;
        this._url = url;
    }

    _response (res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject("Произошла ошибка");
    }

    getUserInformation () {
            return fetch(`${this._url}/users/me`, {
                headers: {
                    authorization: this._token,
            }
        }).then(this._response)
    }

    getCards () {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token,
        }
        }).then(this._response)
    }

    editUserInfo ({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        }).then(this._response)
    }

    addNewCard ({name, link}) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        }).then(this._response)
    }

    removeCard (cardId) {
        console.log(cardId)
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
        }
        }).then(this._response)
    }
}