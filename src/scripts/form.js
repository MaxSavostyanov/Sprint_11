'use strict';
import {validate} from "./validate";

export class Form {
    constructor(form) {
        this.form = form;
        this.submitBtn = this.form.elements.submit;
        this.formElements = Array.from(this.form.elements); // for of
        this.formElements.forEach(item => {
            if (item.name !== 'submit') {
                item.addEventListener('input', validate);
            }
        });
        this.form.addEventListener('input', this.validForm.bind(this));
        this.form.addEventListener('submit', this.submitForm.bind(this));
    }

    activeSubmitBtn() {
        this.submitBtn.removeAttribute('disabled');
        this.submitBtn.classList.add('popup__button_active');
    }

    inactiveSubmitBtn() {
        this.submitBtn.setAttribute('disabled', true);
        this.submitBtn.classList.remove('popup__button_active');
    }

    validForm() {
        let isValid;
        for (let value of this.formElements) {
            if (!value.validity.valid) {
                isValid = false;
                break;
            }
            isValid = true;
        }
        if (isValid) {
            this.activeSubmitBtn();
        } else {
            this.inactiveSubmitBtn();
        }
    }

    submitForm(event) {
        event.preventDefault();
        this.submitBtn.textContent = 'Загрузка...';
    }
}
