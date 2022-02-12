const loginform = document.getElementById('login-form');
const loginEmail = document.getElementById('floatingInput');
const loginPassword = document.getElementById('floatingPassword');
const loginEmailError = document.getElementById('no-email');
const loginPasswordError = document.getElementById('no-password');
const errorList = document.getElementsByClassName('error');

if (loginform) {
    loginform.addEventListener('submit', (event) => {
        if (loginEmail.value && loginPassword.value) {
            loginEmailError.hidden = true;
            loginPasswordError.hidden = true;
            signInForm.submit();
        } else {
            event.preventDefault();
            loginEmailError.hidden = loginEmail.value;
            loginPasswordError.hidden = loginPassword.value;
            errorList.hidden = true;
        }
    });
}
