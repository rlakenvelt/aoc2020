const shared = require('../shared');

const passwords = shared.getInput();
shared.start("day 2B");
let answer = 0;
passwords.forEach(line => {
    const element = line.split(' ').map(x =>x);
    const pos1 = element[0].split('-')[0];
    const pos2 = element[0].split('-')[1];
    const character = element[1].split(':')[0];
    const password = element[2]; 
    characters = password.split('');
    if ((characters[pos1-1]===character) !== (characters[pos2-1]===character)) answer++;
})
shared.end(answer);

