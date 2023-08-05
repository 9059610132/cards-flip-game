const cardValues = ['joke', 'joke', 'fun', 'fun', 'dance', 'dance', 'story', 'story', 'truth', 'truth', 'dare', 'dare'];
let cardsFlipped = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = ''; // Hide the letter initially
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.innerHTML = this.dataset.value; // Show the letter on flip

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardsFlipped += 2;
    if (cardsFlipped === cardValues.length) {
        setTimeout(() => alert('Congratulations! You won!'), 500);
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = ''; // Hide the letter again
        secondCard.innerHTML = ''; // Hide the letter again
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function init() {
    const shuffledValues = shuffle(cardValues);
    const gameContainer = document.querySelector('.game-container');
    shuffledValues.forEach(value => {
        const card = createCard(value);
        gameContainer.appendChild(card);
    });
}

init();
