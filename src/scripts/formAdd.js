'use strict';

class FormAdd extends Form {
    submitForm(event) {
        super.submitForm(event);

        api.addCard(popup.formNewPlace.name.value, popup.formNewPlace.link.value)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(card => {
                cardList.addCard(card.name, card.link, card._id, card.likes, card.owner);
                popup.close(event);
            })
            .catch(err => console.log(err))
            .finally(() => this.submitBtn.textContent = '+');
    }
}