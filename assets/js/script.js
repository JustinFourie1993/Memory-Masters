document.addEventListener("DOMContentLoaded", function () {
    const introModal = document.getElementById("intro-modal");
    const startGameButton = document.getElementById("start-game-button");

    // Show the introduction modal when the page loads
    introModal.style.display = "block";

    // Close the introduction modal and start the game when the "Start Game" button is clicked
    startGameButton.addEventListener("click", function () {
        introModal.style.display = "none";
        startGame();
    });

    // Close the introduction modal when the close button (X) is clicked
    const closeButton = introModal.querySelector(".close");
    closeButton.addEventListener("click", function () {
        introModal.style.display = "none";
    });
});

function startGame() {

    let cards = document.querySelectorAll(".card");
    let matchedCards = 0;
    let cardOne, cardTwo;
    let disableDeck = false;

    //Loop to add event listeners to cards, when clicked, call funtion turnCard() 
    cards.forEach(card => {

        card.addEventListener("click", turnCard);
    });

    //function to turn over card that is clicked by adding "turn" class.
    // code taken from https://www.youtube.com/watch?v=DABkhfsBAWw&t=1553s
    function turnCard(e) {
        let clickedCard = e.target;
        if (clickedCard !== cardOne && !disableDeck) {
            clickedCard.classList.add("turn");
            if (!cardOne) {
                return cardOne = clickedCard;
            }
            cardTwo = clickedCard;
            disableDeck = true;

            let cardOneImg = cardOne.querySelector(".card-front img").src;  //Assigning images.
            let cardTwoImg = cardTwo.querySelector(".card-front img").src;
            matchCards(cardOneImg, cardTwoImg);  //Call function to check if cards matched.
        }
    }

    //Function to check if cards match.
    // code taken from https://www.youtube.com/watch?v=DABkhfsBAWw&t=1553s
    function matchCards(img1, img2) {
        if (img1 === img2) {
            matchedCards++;
            if (matchedCards == 8) {   //Once all cards are matched, the deck is shuffled after 2 sec.
                setTimeout(() => {
                    return shuffleDeck();
                }, 2000);

            }
            cardOne.removeEventListener("click", turnCard); //Removes click to turn so matched cards stay face up.
            cardTwo.removeEventListener("click", turnCard);
            cardOne = cardTwo = "";    //Sets value to blank.
            return disableDeck = false;
        }

        //Funtion to remove turn class if cards not matched (they flip back).
        // code taken from https://www.youtube.com/watch?v=DABkhfsBAWw&t=1553s
        setTimeout(() => {
            cardOne.classList.remove("turn");
            cardTwo.classList.remove("turn");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1000);

    }

    //Function to randomize card placement and flip cards back over
    // code taken from https://www.youtube.com/watch?v=DABkhfsBAWw&t=1553s
    function shuffleDeck() {
        disableDeck = false;
        matchedCards = 0;
        cardOne = cardTwo = "";
        //Array with each available card name.
        let myArray = ['ace-spades', 'king-spades', 'queen-spades', 'jack-spades', 'ace-hearts', 'king-hearts', 'queen-hearts', 'jack-hearts',
            'ace-spades', 'king-spades', 'queen-spades', 'jack-spades', 'ace-hearts', 'king-hearts', 'queen-hearts', 'jack-hearts'];
        myArray.sort(() => Math.random() - 0.5);  //Sorts array randomly.

        //Loop to alter every card
        cards.forEach((card, index) => {
            card.classList.remove("turn");  //Remove "turn" class, all cards now face down
            let imgTag = card.querySelector(".pic");
            imgTag.src = `assets/images/${myArray[index]}.png`; //Assigns each cards img from the randomly sorted array.
            card.addEventListener("click", turnCard);   //Reasigns event listener to turn cards if clicked.
        });
    }

    shuffleDeck();  //Deck is shuffled when page loads

}








