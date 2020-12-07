
const shared = require('../common/base.js');

let answer = 0;
shared.start("day 7A");
const bags = shared.getInput()
                   .map(convertToBag);

answer = [...new Set(bagsContaining('shiny gold'))].length;

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
function bagsContaining(color) {
    const list = bags.filter(bag => bag.contains.some(a => a.color===color));
    let countList = [];
    if (list.length > 0) {
        countList = list.map(a => a.color);
        list.forEach(a => {
            countList = [...countList, ...bagsContaining(a.color)];
        });
    }
    return countList;
}

shared.end(answer);

