'use strict';

class FormEdit extends Form {
    submitForm(event) {
        super.submitForm(event);

        api.editUser(popup.username.value, popup.about.value)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(user => {
                document.querySelector('.user-info__name').textContent = user.name;
                document.querySelector('.user-info__job').textContent = user.about;
                popup.close(event);
            })
            .catch(err => console.log(err))
            .finally(() => this.submitBtn.textContent = 'Сохранить');
    }
}