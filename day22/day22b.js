
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 22B");
const deck  = shared.getInput('\n\n')
                    .map(x=>x.split('\n'))
                    .map(x=>{
                        x.shift();
                        return x.map(x=>parseInt(x));
                    });

let game=0;
// console.log(deck);
// console.log(calculateHash(deck));
answer=calculateScore(playGame(deck));

shared.end(answer);


function playGame(playersCards) {
    let round = 0;
    let hashStack=[];
    game++;
    while (playersCards[0].length>0&&playersCards[1].length>0) {
        const roundHash = calculateHash(playersCards);
        let winner;
        let drawnCards=[];
        round++;
        // console.log('ROUND', round);
        if (hashStack.includes(roundHash)) {
            // console.log('PREVENT LOOP');
            return [[...playersCards[0]],[]];
        }
        hashStack.push(roundHash);
        drawnCards.push(playersCards[0].shift());
        drawnCards.push(playersCards[1].shift());
        if (drawnCards[0]<=playersCards[0].length&&drawnCards[1]<=playersCards[1].length) {
            // console.log('GAME', game, 'ROUND', round, 'PLAY SUBGAME');
            const subgameCards=playGame([[...playersCards[0]], [...playersCards[1]]]);
            winner = (subgameCards[0]>subgameCards[1]?0:1);
        } else {
            winner = (drawnCards[0]>drawnCards[1]?0:1);
        }
        if (winner>0) drawnCards=drawnCards.reverse();
        playersCards[winner]=[...playersCards[winner], ...drawnCards];
    }
    return playersCards;
}

function calculateScore(cards) {
    console.log('FINAL', cards);
    cards = cards.filter(cards=>cards.length>0)[0];
    let l = cards.length;
    let total = 0;
    cards.forEach((card, index) => {
        total+=card*l;
        l--;
    });
    return total;
}

function calculateHash(cards) { 
    return cards[0].join(',') + '-' + cards[1].join(',');
}
