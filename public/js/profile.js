console.log('js linked')
const accountDivElement = document.querySelector('#account-profile-div');
const signUpBtn = document.querySelector('#sign-profile-up');
const signInBtn = document.querySelector('#sign-profile-in');
const signUpFormElement = document.querySelector('#signUp-profile-form');
const signInFormElement = document.querySelector('#signIn-profile-form');
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