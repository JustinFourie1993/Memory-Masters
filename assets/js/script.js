let cards = document.getElementsByClassName('card');

for (card in cards) {
    addEventListener("click", turnCard);
}

function turnCard(e) {
    console.log(e.target);
}

