'use strict';

export class Api {
    constructor(token, server) {
        this.token = token;
        this.server = server;
    }

    getUser() {
        return fetch(`${this.server}/users/me`, {
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
    }

    getInitialCards() {
        return fetch(`${this.server}/cards`, {
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
    }

    editUser(name, about) {
        return fetch(`${this.server}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }

    addCard(name, link) {
        return fetch(`${this.server}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        });
    }

    deleteCard(id) {
        return fetch(`${this.server}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        });
    }

    getLiked(event, toggleLike) {
        return fetch(`${this.server}/cards/like/${event.target.dataset.id}`, {
                method: 'PUT',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(card => {
                toggleLike(event, card);
            })
            .catch(err => console.log(err));
    }

    removeLiked(event, toggleLike) {
        return fetch(`${this.server}/cards/like/${event.target.dataset.id}`, {
                method: 'DELETE',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(card => {
                toggleLike(event, card);
            })
            .catch(err => console.log(err));
    }

    setAvatar(link) {
        return fetch(`${this.server}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        });
    }
}
