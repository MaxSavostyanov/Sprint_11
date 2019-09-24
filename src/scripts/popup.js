'use strict';
import {resetAllError} from "./validate";
import {formAdd,formEdit, editAvatar} from "../app";

export class Popup {
    constructor(container) {
        this.container = container;
        this.formEditUser = document.forms.editUser;
        this.username = this.formEditUser.elements.username;
        this.about = this.formEditUser.elements.about;
        this.formNewPlace = document.forms.newPlace;
        this.formEditAvatar = document.forms.editAvatar;
    }

    open(event) {
        if (event.target.classList.contains('place-card__image')) {
            this.openImage(event);
        } else if (event.target.classList.contains('user-info__button_add')) {
            this.openAdd();
        } else if (event.target.classList.contains('user-info__button_edit')) {
            this.openEdit();
        } else if (event.target.classList.contains('user-info__photo')) {
            this.openEditAvatar();
        } else {
            return;
        }
        this.container.classList.add('popup_is-opened');
    }

    close(event) {
        this.container.classList.remove('popup_is-opened');
        event.target.closest('.popup__content').classList.remove('popup__content_visible');
        resetAllError();
    }

    openImage() {
        this.container.querySelector('.popup__content_image').classList.add('popup__content_visible');
        this.container.querySelector('.popup__image').src = event.target.dataset.url;
    }

    openAdd() {
        this.formNewPlace.reset();
        this.container.querySelector('.popup__content_add-place').classList.add('popup__content_visible');
        formAdd.inactiveSubmitBtn();
    }

    openEdit() {
        this.container.querySelector('.popup__content_edit-user').classList.add('popup__content_visible');
        this.username.value = document.querySelector('.user-info__name').innerText;
        this.about.value = document.querySelector('.user-info__job').innerText;
        formEdit.activeSubmitBtn();
    }

    openEditAvatar() {
        this.formEditAvatar.reset();
        this.container.querySelector('.popup__content_edit-avatar').classList.add('popup__content_visible');
        editAvatar.inactiveSubmitBtn();
    }
}
