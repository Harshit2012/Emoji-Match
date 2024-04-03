document.addEventListener('DOMContentLoaded', () => {
    const emojis = ['😀', '🚀', '🎈', '🐶', '🏀', '🍕', '🧠', '🌵'];
    const gameBoard = document.getElementById('game-board');
    const restartBtn = document.getElementById('restart-btn');
    let openedCards = [];
    let matchedCards = [];

    function createCard(emoji) {
        const card = document.createElement('div');
        card.classList.add('col-3', 'card');
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        return card;
    }

    function flipCard() {
        this.classList.add('open');
        this.textContent = this.dataset.emoji;
        openedCards.push(this);
        if (openedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const [firstCard, secondCard] = openedCards;
        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            matchedCards.push(firstCard, secondCard);
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            firstCard.classList.remove('open');
            secondCard.classList.remove('open');
            firstCard.textContent = '';
            secondCard.textContent = '';
        }
        openedCards = [];
        checkGameOver();
    }

    function checkGameOver() {
        if (matchedCards.length === emojis.length * 2) {
            alert('Congratulations🎉! You found all matches!');
        }
    }

    function initializeGame() {
        gameBoard.innerHTML = '';
        matchedCards = [];
        const shuffledEmojis = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
        shuffledEmojis.forEach(emoji => {
            gameBoard.appendChild(createCard(emoji));
        });
    }

    restartBtn.addEventListener('click', initializeGame);

    initializeGame();
});
