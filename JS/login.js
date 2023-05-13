const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '');
}

const handleSubimit = (Event) => {
    Event.preventDefault();
    localStorage.setItem('player', input.value);
    window.location = 'Pages/game.html';
    
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubimit);