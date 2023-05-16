const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'acertou',
    'bill',
    'cafe',
    'calca',
    'forninho',
    'irineu',
    'nossaAlegria',
    'pao',
    'cepo',
    'sergio',
];

const audioClips = {
    acertou: new Audio('../SONG/acertou.mp3'),
    bill: new Audio('../SONG/bill.mp3'),
    cafe: new Audio('../SONG/cafe.mp3'),
    calca: new Audio('../SONG/calca.mp3'),
    forninho: new Audio('../SONG/forninho.mp3'),
    irineu: new Audio('../SONG/irineu.mp3'),
    nossaAlegria: new Audio('../SONG/nossaAlegria.mp3'),
    pao: new Audio('../SONG/pao.mp3'),
    cepo: new Audio('../SONG/cepo.mp3'),
    sergio: new Audio('../SONG/sergio.mp3'),
};


const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20) {
        clearInterval(loop);

        const message = document.querySelector('.message');
        const playerName = document.querySelector('.player-name');
        const elapsedTime = document.querySelector('.elapsed-time');
        const reloadImage = document.querySelector('.reload');

        playerName.textContent = spanPlayer.innerHTML;
        elapsedTime.textContent = timer.innerHTML;

        message.style.display = 'block';

        reloadImage.addEventListener('click', () => {
            window.location.reload();
        });
    }
};


const checkCards = () => {

    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';
        audioClips[firstCharacter].play();
        audioClips[secondCharacter].play();

        checkEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';


        }, 1000);

    }




}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }



}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../IMG/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);


    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}


const startTimer = () => {
    let minutes = 0;
    let seconds = 0;

    this.loop = setInterval(() => {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        timer.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
};




window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();

    const message = document.querySelector('.message');
    message.style.display = 'none';
}


Object.values(audioClips).forEach((audio) => {
    audio.preload = 'auto';
})

