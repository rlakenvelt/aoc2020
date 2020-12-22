
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 22B");
const deck  = shared.getInput('\n\n')
                    .map(x=>x.split('\n'))
                    .map(x=>{
                        x.shift();
                        return x.map(x=>parseInt(x));
                    });

answer=calculateScore(playGame(deck));

shared.end(answer);

function playGame(decks) {
    let hashStack=[];
    let winner;
    while (decks[0].length>0&&decks[1].length>0) {
        const hash = calculateHash(decks);
        let drawnCards=[];
        if (hashStack.includes(hash)) {
            winner=0;
            break;
        }
        hashStack.push(hash);
        drawnCards.push(decks[0].shift());
        drawnCards.push(decks[1].shift());
        if (drawnCards[0]<=decks[0].length&&drawnCards[1]<=decks[1].length) {
            winner = result=playGame([[...decks[0].slice(0, drawnCards[0])], [...decks[1].slice(0, drawnCards[1])]]).winner;
        } else {
            winner = (drawnCards[0]>drawnCards[1]?0:1);           
        }
        if (winner>0) drawnCards=drawnCards.reverse();
        decks[winner]=[...decks[winner], ...drawnCards];
    }
    return {winner, deck: [...decks[winner]]};
}

function calculateScore(result) {
    return result.deck
                 .reverse()
                 .reduce((total, card, index)=> {
                     return total+=card*(index+1);
                 }, 0);
}

function calculateHash(cards) { 
    return cards[0].join(',') + '-' + cards[1].join(',');
}
