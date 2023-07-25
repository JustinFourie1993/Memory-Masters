const cards = document.querySelectorAll(".card");

let matchedCards = 0;
let cardOne, cardTwo;
let disableDeck = false;

function turnCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("turn");
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

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCards++;
        if (matchedCards == 8) {
            setTimeout(() => {
                return shuffleDeck();
            }, 1000);

        }
        cardOne.removeEventListener("click", turnCard);
        cardTwo.removeEventListener("click", turnCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.remove("turn");
        cardTwo.classList.remove("turn");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1000);

}

function shuffleDeck() {
    matchedCards = 0;
    cardOne = cardTwo = "";
    String allCards[] = {}
    let myArray = ['ace-spades', 'king-spades', 'queen-spades', 'jack-spades', 'ace-hearts', 'king-hearts', 'queen-hearts', 'jack-hearts',
     'ace-spades', 'king-spades', 'queen-spades', 'jack-spades', 'ace-hearts', 'king-hearts', 'queen-hearts', 'jack-hearts'];
   

    cards.forEach(card => {
        let imgTag = card.querySelector(".pic")
        imgTag.src = `images`
        card.classList.remove("turn");
        card.addEventListener("click", turnCard);
    });


}


cards.forEach(card => {
    card.classList.add("turn");
    card.addEventListener("click", turnCard);
});






