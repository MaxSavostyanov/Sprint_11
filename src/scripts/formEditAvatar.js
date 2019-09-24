'use strict';

class FormEditAvatar extends Form {
    submitForm(event) {
        super.submitForm(event);

        api.setAvatar(popup.formEditAvatar.avatarLink.value)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(user => {
                userPhoto.style.backgroundImage = `url("${user.avatar}")`;
                popup.close(event);
            })
            .catch(err => console.log(err))
            .finally(() => this.submitBtn.textContent = 'Сохранить');
    }
}