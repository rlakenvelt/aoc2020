
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 7B");
const bags = shared.getInput()
                   .map(convertToBag);
answer = bagsIncludedIn('shiny gold');

function convertToBag(rule) {
    const words = rule.split(' ');
    const bag = {color: words[0] + ' ' + words[1], contains: []}
    for (let index = 4; index < words.length; index+=4) {
        if (words[index] !== 'no') {
            bag.contains.push({color: words[index + 1] + ' ' + words[index + 2], count: parseInt(words[index])});
        }
    }
    return bag;
}

function bagsIncludedIn(color) {
    let count = 0;                            
    bags.find(a => a.color === color).contains.forEach(a => {
        count += a.count + a.count * bagsIncludedIn(a.color);
    });
    return count;
}


shared.end(answer);

