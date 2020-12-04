export class Api {
    constructor({token, url}) {
        this._token = token;
        this._url = url;
    }

    getUserInformation () {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token
        }
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        }); 
    }

    getCard () {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token
        }
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        }); 
    }
}