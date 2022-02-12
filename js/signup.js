$(document).ready(function () {
    const $form = $('#signup');
    var newFirstNameInput = $('#firstname'),
        newLastNameInput = $('#lastname'),
        newEmailInput = $('#email'),
        newDobInput = $('#dateOfBirth'),
        newGenderInput = $('#gender');
    (newCityInput = $('#city')),
        (newStateInput = $('#state')),
        (newUsernameInput = $('#username')),
        (newPasswordInput = $('#floatingPassword'));
    let error = $('#error');
    let errorList = $('#errorList');
    error.hide();

    $('#signup-form').on('submit', function (e) {
        e.preventDefault();
        var newFirstName = newFirstNameInput.val();
        var newLastName = newLastNameInput.val();
        var newEmail = newEmailInput.val();
        var newDob = newDobInput.val();
        var newGender = newGenderInput.val();
        var newCity = newCityInput.val();
        var newState = newStateInput.val();
        var newUsername = newUsernameInput.val();
        var newPassword = newPasswordInput.val();
        let errorshow = $('#errormessage');
        errorshow.empty();
        errorshow.hide();

        //validations

        function validateEmail(newEmail) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(newEmail).toLowerCase());
        }
        if (!newEmail || newEmail.trim() === '') {
            errorList.append(`<li>E-Mail must be provided!</li>`);
            error.show();
            return;
        } else if (!validateEmail(newEmail)) {
            errorList.append(`<li>E-Mail must be in correct format!</li>`);
            error.show();
            return;
        }

        if (!newPassword || newPassword.trim() === '') {
            errorList.append(`<li>Password must be provided!</li>`);
            error.show();
            return;
        }

        if (!newFirstName || newFirstName.trim() === '') {
            errorList.append(`<li>First name must be provided!</li>`);
            error.show();
            return;
        }
        if (!newLastName || newLastName.trim() === '') {
            errorList.append(`<li>Last name must be provided!</li>`);
            error.show();
            return;
        }

        if (!newDob || newDob.trim() === '') {
            errorList.append(`<li>DOB must be provided!</li>`);
            error.show();
            return;
        }
        if (!newUsername || newUsername.trim() === '') {
            errorList.append(`<li>Username must be provided!</li>`);
            error.show();
            return;
        }

        if (!newCity || newCity.trim() === '') {
            errorList.append(`<li>City must be provided!</li>`);
            error.show();
            return;
        }
        if (!newState || newState.trim() === '') {
            errorList.append(`<li>State must be provided!</li>`);
            error.show();
            return;
        }
        function dateChecker(date1, date2 = new Date()) {
            var date1 = new Date(Date.parse(date1));
            var date2 = new Date(Date.parse(date2));
            var ageTime = date2.getTime() - date1.getTime();

            if (ageTime < 0) {
                return false; //date2 is before date1
            } else {
                return true;
            }
        }
        if (newDob) {
            if (!dateChecker(newDob)) {
                errorList.append(`<li>DOB cannot be a future date!</li>`);
                error.show();
                return;
            }
        }
        if (newCity) {
            newCity = newCity.trim();
            let regex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
            if (!regex.test(newCity)) {
                errorList.append(`<li>City format provided is invalid </li>`);
                error.show();
                return;
            }
        }
        if (newUsername) {
            let checkvaliduser = /[A-Za-z0-9]{4,}/g;
            if (!checkvaliduser.test(newUsername)) {
                errorList.append(
                    `<li>Invalid Format for username provided, Atleast 4 Characters and no spaces allowed.</li>`
                );
                error.show();
                return;
            }
        }
        if (newPassword) {
            let checkvalidpass = /[A-Za-z0-9\W]{6,}/g;
            if (!checkvalidpass.test(newPassword)) {
                errorList.append(
                    `<li>Invalid format for Password provided,Atleast 6 Characters and no Alphanumeric allowed.</li>`
                );
                error.show();
                return;
            }
        }

        if (
            newFirstName &&
            newLastName &&
            newDob &&
            newGender &&
            newEmail &&
            newPassword &&
            newUsername &&
            newState &&
            newCity
        ) {
            var useJson = true;
            if (useJson) {
                $.ajax({
                    method: 'POST',
                    url: '/signup',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        firstName: newFirstName,
                        lastName: newLastName,
                        email: newEmail,
                        dateOfBirth: newDob,
                        gender: newGender,
                        city: newCity,
                        state: newState,
                        username: newUsername,
                        password: newPassword,
                    }),
                    success: function (response) {
                        if (response.message === 'success') {
                            window.location.href = '/login';
                        }
                    },
                    error: function (xhr, status, error) {
                        var errorMessage = xhr.responseJSON.error;
                        let p = `<p>${errorMessage}</p>`;
                        errorshow.removeClass('d-none');
                        errorshow.append(p);
                        errorshow.show();
                    },
                });
            }
        }
    });
});
