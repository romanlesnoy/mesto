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

    editUserInfo (name, about) {
        console.log(name,about);
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
}