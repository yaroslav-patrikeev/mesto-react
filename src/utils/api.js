class Api {
    constructor() {
        this._baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-66';
        this._autorizationKey = 'f9a58eab-d2de-4166-9a66-6bc6595d2d82';
      }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    } 
    
    
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._autorizationKey
            }
        })
        .then(res => this._getResponseData(res))
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._autorizationKey
            }
        })
        .then(res => this._getResponseData(res))
    }

    changeUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._autorizationKey,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => this._getResponseData(res))
    }

    addNewCard(title, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._autorizationKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title, 
                link: link
            })
        })
        .then(res => this._getResponseData(res))
        }
    
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._autorizationKey
            }
        })
        .then(res => this._getResponseData(res))

    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._autorizationKey
            }
        })
        .then(res => this._getResponseData(res))
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._autorizationKey
            }
        })
        .then(res => this._getResponseData(res))
    }

    changeUserAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._autorizationKey,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(res => this._getResponseData(res))
    }
}

export default Api = new Api();