'use strict';

function validate(event) {
    const element = event.target;
    const errorElement = document.querySelector(`#error-${element.id}`);
    errorElement.textContent = '';
    if (element.validity.valueMissing) {
        errorElement.textContent = "Это обязательное поле";
    } else if (element.getAttribute('type') === 'url' && element.validity.typeMismatch) {
        errorElement.textContent = "Здесь должна быть ссылка";
    } else if (!element.validity.valid) {
        errorElement.textContent = "Должно быть от 2 до 30 символов";
    }
}

function resetAllError() {
    const errorElements = document.querySelectorAll('.popup__error-message');
    for(let elem of errorElements) elem.textContent = ' ';
}