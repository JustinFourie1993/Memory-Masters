let cards = document.getElementsByClassName('card');

for (card in cards) {
    addEventListener("click", turnCard);
}

let cardOne, cardTwo;

function turnCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne) {
        clickedCard.classList.add("turn");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        console.log(cardOne, cardTwo);
    }
}







