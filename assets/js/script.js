// When page loads variables are assigned and eventlistener add
document.addEventListener("DOMContentLoaded", function () {
    const introModal = document.getElementById("intro-modal");
    const startGameButton = document.getElementById("start-game-button");

    // Close the introduction modal and start the game when the "Start Game" 
    // button is clicked
    startGameButton.addEventListener("click", function () {
        introModal.style.display = "none";
        startGame();
    });

});

// function to set game in play
function startGame() {
    let cards = document.querySelectorAll(".card");
    let matchedCards = 0;
    let cardOne, cardTwo;
    let disableDeck = false;
    let moves = 0;
    let timerInterval;
    let seconds = 0;

    const movesDisplay = document.querySelector(".moves");
    const timerDisplay = document.querySelector(".timer");
    const resetButton = document.querySelector(".reset-button");
    const finalTime = document.getElementById("final-time");
    const finalMoves = document.getElementById("final-moves");
    const winModal = document.getElementById("win-modal");
    const flipSound = document.getElementById("flip-sound");
    const matchSound = document.getElementById("match-sound");
    const winSound = document.getElementById("win-sound");

    // displays ammount of moves
    function incrementMoves() {
        moves++;
        movesDisplay.textContent = `Moves: ${moves}`;
    }

    // displays time played
    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = `Time: ${seconds}s`;
        }, 1000);
    }

    startTimer();

    function stopTimer() {
        clearInterval(timerInterval);
    }

    // stops timer and displays win modal if all cards are matched
    function checkWin() {
        if (matchedCards === 8) {
            stopTimer();
            setTimeout(() => {
                showWinModal();
            }, 1000);
        }
    }

    // displays win modal with final time and moves made
    function showWinModal() {
        finalTime.textContent = `${seconds}s`;
        finalMoves.textContent = moves;
        winModal.style.display = "block";
        winSound.play();
    }

    // resets timer, moves, shuffles the deck and hides win modal
    function resetGame() {
        stopTimer();
        matchedCards = 0;
        moves = 0;
        seconds = 0;
        movesDisplay.textContent = "Moves: 0";
        timerDisplay.textContent = "Time: 0s";
        shuffleDeck();
        winModal.style.display = "none";
        startTimer();
    }

    resetButton.addEventListener("click", resetGame);

    // turncard function taken from tuturial 
    // https://www.youtube.com/watch?v=DABkhfsBAWw&t=1553s
    // adds a class to clicked cards to turn them over, and check if matched
    function turnCard(e) {
        let clickedCard = e.target;
        if (clickedCard !== cardOne && !disableDeck) {
            flipSound.play();
            clickedCard.classList.add("turn");
            incrementMoves();
            if (!cardOne) {
                return cardOne = clickedCard;
            }
            cardTwo = clickedCard;
            disableDeck = true;

            let cardOneImg = cardOne.querySelector(".card-front img").src;
            let cardTwoImg = cardTwo.querySelector(".card-front img").src;
            matchCards(cardOneImg, cardTwoImg);
        }
    }

    // matchCards function taken from tuturial 
    // https://www.youtube.com/watch?v=DABkhfsBAWw&t=1553s
    // if cards match, remove click event, else remove class that 
    // has flipped them over.  And check if game is won
    function matchCards(img1, img2) {
        if (img1 === img2) {
            matchedCards++;
            setTimeout(() => {
                matchSound.play();
            }, 1000);
            cardOne.removeEventListener("click", turnCard);
            cardTwo.removeEventListener("click", turnCard);
            cardOne = cardTwo = "";
            disableDeck = false;
            checkWin();
        } else {
            setTimeout(() => {
                cardOne.classList.remove("turn");
                cardTwo.classList.remove("turn");
                cardOne = cardTwo = "";
                disableDeck = false;
            }, 1000);
        }
    }

    // shuffleDeck function taken from tuturial 
    // https://www.youtube.com/watch?v=DABkhfsBAWw&t=1553s
    // resets deck, creates an array of all cards and randomizes it, then 
    // assigns an image to each card, removes turn class, reasigns click event
    function shuffleDeck() {
        disableDeck = false;
        matchedCards = 0;
        cardOne = cardTwo = "";
        let myArray = ['ace-spades', 'king-spades', 'queen-spades',
        'jack-spades', 'ace-hearts', 'king-hearts', 'queen-hearts',
        'jack-hearts', 'ace-spades', 'king-spades', 'queen-spades',
        'jack-spades', 'ace-hearts', 'king-hearts', 'queen-hearts',
        'jack-hearts'];
        myArray.sort(() => Math.random() - 0.5);

        cards.forEach((card, index) => {
            card.classList.remove("turn");
            let imgTag = card.querySelector(".pic");
            imgTag.src = `assets/images/${myArray[index]}.png`;
            card.addEventListener("click", turnCard);
        });
    }

    shuffleDeck();
}


