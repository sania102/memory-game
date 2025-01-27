let board = document.getElementById('game-board');
let moves = 0;
let flippedCards = [];
let matchedCards = 0;
let timerInterval;
let seconds = 0;
let minutes = 0;
let totalTime = 0;
const totalPairs = 8;  // Number of pairs of cards

// Define the card values (use any pair of images or numbers)
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = [...cardValues, ...cardValues];

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create and display the cards
function createBoard() {
    shuffle(cards);
    cards.forEach((value, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

// Flip the card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.textContent = this.getAttribute('data-value');
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if the flipped cards match
function checkMatch() {
    moves++;
    document.getElementById('moves').textContent = moves;

    if (flippedCards[0].getAttribute('data-value') === flippedCards[1].getAttribute('data-value')) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        matchedCards++;

        if (matchedCards === totalPairs) {
            clearInterval(timerInterval);
            setTimeout(() => alert('Congratulations! You won!'), 300);
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            flippedCards[1].classList.remove('flipped');
            flippedCards[0].textContent = '';
            flippedCards[1].textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        document.getElementById('timer').textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        totalTime++;
    }, 1000);
}

// Reset the game
function resetGame() {
    moves = 0;
    flippedCards = [];
    matchedCards = 0;
    seconds = 0;
    minutes = 0;
    totalTime = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('timer').textContent = '00:00';
    board.innerHTML = '';
    createBoard();
    startTimer();
}

// Event listener for the restart button
document.getElementById('reset-btn').addEventListener('click', resetGame);

// Initialize the game
createBoard();
startTimer();
