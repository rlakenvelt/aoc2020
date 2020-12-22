
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 22A");
const deck  = shared.getInput('\n\n')
                    .map(x=>x.split('\n'))
                    .map(x=>{
                        x.shift();
                        return x.map(x=>parseInt(x));
                    });
while (deck[0].length>0&&deck[1].length>0) {
    card1=deck[0].shift();
    card2=deck[1].shift();
    if (card1>card2) {
        deck[0]=addToBottom(deck[0], card1, card2);
    } else {
        deck[1]=addToBottom(deck[1], card2, card1);
    }
}

if (deck[0].length>0) {
    answer=calculateScore(deck[0]);
} else {
    answer=calculateScore(deck[1]);
}


// console.log(deck);

shared.end(answer);

function addToBottom(cards, card1, card2) {
    const newcards = [...cards];
    newcards.push(card1);
    newcards.push(card2);
    return newcards;
}

function calculateScore(cards) {
    let l = cards.length;
    let total = 0;
    cards.forEach((card, index) => {
        total+=card*l;
        l--;
    });
    return total;
}
