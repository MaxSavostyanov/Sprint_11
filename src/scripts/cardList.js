'use strict';

class CardList {
    constructor(container) {
        this.container = container;
        this.cards = [];

        this.container.addEventListener('click', (event) => {
            if (event.target.classList.contains('place-card__like-icon')) {
                this.like(event);
            } else if (event.target.classList.contains('place-card__delete-icon')) {
                this.remove(event);
            }
        });
    }

    addCard(name, link, id, like, owner) {
        const {
            cardElement
        } = new Card(name, link, id, like, owner);

        this.container.appendChild(cardElement);
    }

    render() {
        this.cards.forEach(item => this.addCard(item.name, item.link, item._id, item.likes, item.owner));
    }

    like(event) {
        if (!event.target.classList.contains('place-card__like-icon_liked')) {
            api.getLiked(event, this.toggleLike);  
        } else {
            api.removeLiked(event, this.toggleLike);
        }
    }

    toggleLike(event, card) {
        const likeCount = event.target.nextElementSibling;
        likeCount.textContent = card.likes.length;
        event.target.classList.toggle('place-card__like-icon_liked');
    }


    remove(event) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            if (window.confirm("Вы точно хотите удалить эту карточку?")) {
                api.deleteCard(event.target.dataset.id)
                    .then(res => {
                        if (res.ok) {
                            this.container.removeChild(event.target.closest('.place-card'));
                            return;
                        }
                        return Promise.reject(res.status);
                    })
                    .catch(err => console.log(err));
            }
        }
    }
}