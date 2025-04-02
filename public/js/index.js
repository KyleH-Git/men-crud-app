const accountDivElement = document.querySelector('#account-div');
const signUpBtn = document.querySelector('#sign-up');
const signInBtn = document.querySelector('#sign-in');
const signUpFormElement = document.querySelector('#signUp-form');
const signInFormElement = document.querySelector('#signIn-form');
const cancelAccBtns = document.querySelectorAll('.cancel-acc-btn')

signUpBtn.addEventListener('click', (event) => {
    accountDivElement.classList.toggle('hidden');
    signUpFormElement.classList.toggle('hidden');
});

signInBtn.addEventListener('click', (event) => {
    accountDivElement.classList.toggle('hidden');
    signInFormElement.classList.toggle('hidden');
});


for(btn of cancelAccBtns){
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        accountDivElement.classList.toggle('hidden');
        event.currentTarget.parentElement.classList.toggle('hidden');
    });
}