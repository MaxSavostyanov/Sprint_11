'use strict';

export class Card {
    constructor(name, link, id, like, owner) {
        this.name = name;
        this.link = link;
        this.id = id;
        this.like = like;
        this.owner = owner.name;
        this.userName = document.querySelector('.user-info__name').textContent;
        this.cardElement = this.create();
    }

    create() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('place-card');

        const placeImage = document.createElement('div');
        placeImage.classList.add('place-card__image');
        placeImage.style.backgroundImage = `url(${this.link})`;
        placeImage.dataset.url = this.link;

        if (this.owner === this.userName) {
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('place-card__delete-icon');
            deleteButton.dataset.id = this.id;
            placeImage.appendChild(deleteButton);
        }

        const placeDescription = document.createElement('div');
        placeDescription.classList.add('place-card__description');

        const placeName = document.createElement('h3');
        placeName.classList.add('place-card__name');
        placeName.textContent = this.name;
        placeDescription.appendChild(placeName);

        const likeBlock = document.createElement('div');
        likeBlock.classList.add('place-card__like');

        const likeButton = document.createElement('button');
        likeButton.classList.add('place-card__like-icon');
        if (this.like.some(item => item.name === this.userName)) {
            likeButton.classList.add('place-card__like-icon_liked');
        }
        likeButton.dataset.id = this.id;
        likeBlock.appendChild(likeButton);

        const likeCount = document.createElement('p');
        likeCount.classList.add('place-card__like-count');
        likeCount.textContent = this.like.length;
        likeBlock.appendChild(likeCount);

        placeDescription.appendChild(likeBlock);
        cardElement.appendChild(placeImage);
        cardElement.appendChild(placeDescription);
        return cardElement;
    }
}
