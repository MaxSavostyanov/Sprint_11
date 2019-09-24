'use strict';

const token = 'b4d1b43e-e04a-4764-a7fe-40543eeb3d35';
const server = 'http://95.216.175.5/cohort2';
const api = new Api(token, server);

const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');
const userPhoto = document.querySelector('.user-info__photo');

const popup = new Popup(document.querySelector('.popup'));
const cardList = new CardList(document.querySelector('.places-list'));
const formAdd = new FormAdd(popup.formNewPlace);
const formEdit = new FormEdit(popup.formEditUser);
const editAvatar = new FormEditAvatar(popup.formEditAvatar);

function renderUser() {
    api.getUser()
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then(user => {
            userName.textContent = user.name;
            userAbout.textContent = user.about;
            userPhoto.style.backgroundImage = `url("${user.avatar}")`;
        })
        .catch(err => console.log(err));
}

function renderCardList() {
    api.getInitialCards()
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then(res => {
            cardList.cards = res;
            cardList.render();
        })
        .catch(err => console.log(err));
}

function init() {
    renderUser();
    renderCardList();
    document.querySelector('.user-info__button_add').addEventListener('click', popup.open.bind(popup));
    document.querySelector('.user-info__button_edit').addEventListener('click', popup.open.bind(popup));
    document.querySelector('.user-info__photo').addEventListener('click', popup.open.bind(popup));
    cardList.container.addEventListener('click', popup.open.bind(popup));
    document.querySelector('.popup').addEventListener('click', event => {
        if (event.target.classList.contains('popup__close')) popup.close(event);
    });
}

init();